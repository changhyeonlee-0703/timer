const Time = require("../schemas/time");
const moment = require("moment");

exports.getTime = async () => {
  const today = moment().startOf("day");
  const todayTime = await Time.findOne({
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });

  const yesterday = moment(today).subtract(1, "day");
  const yesterdayTime = await Time.findOne({
    createdAt: {
      $gte: yesterday.toDate(),
      $lte: moment(yesterday).endOf("day").toDate(),
    },
  });
  // const ExistedTime = await Time.find({
  //     $or:[
  //         {createAt: moment().format(today)},
  //         {createAt: moment().format(yesterday)}
  //     ]
  // });

  return { todayTime, yesterdayTime };
};

exports.studyStart = async (studyStartPoint) => {
  const today = moment().startOf("day");
  const existedTime = await Time.findOne({
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });
  if (existedTime) {
    if (existedTime.studyStartPoint !== 0) {
      throw new Error("공부 시작 포인트가 이미 존재합니다.");
    }
    existedTime.studyStartPoint = studyStartPoint;
    await existedTime.save();
    return "study start success";
  } else {
    await Time.create({ studyStartPoint });
    return "study start data create success";
  }
};

exports.studyEnd = async (studyEndPoint) => {
  const today = moment().startOf("day");
  const existedTime = await Time.findOne({
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });
  if (existedTime) {
    if (existedTime.studyStartPoint === 0) {
      throw new Error("공부 시작 포인트가 0 에러입니다.");
    }
    if (existedTime.studyStartPoint >= studyEndPoint) {
      throw new Error(
        "공부 종료 포인트가 공부 시작 포인트보다 시간상 앞서 있습니다."
      );
    }
    existedTime.savedStudyTime += studyEndPoint - existedTime.studyStartPoint;
    existedTime.studyStartPoint = 0;
    existedTime.studyEndPoint = 0;
    await existedTime.save();
    return "Study time has been accumulated.";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

exports.restStart = async (studyEndPoint, restStartPoint) => {
  const today = moment().startOf("day");
  const existedTime = await Time.findOne({
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });

  if (existedTime) {
    if (existedTime.restStartPoint !== 0) {
      throw new Error("휴식 시작 포인트가 이미 존재합니다.");
    }
    existedTime.restStartPoint = restStartPoint;
    existedTime.savedStudyTime += studyEndPoint - existedTime.studyStartPoint;
    existedTime.studyStartPoint = 0;
    existedTime.studyEndPoint = 0;
    await existedTime.save();
    return "rest start success";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};

exports.restEnd = async (restEndPoint, studyStartPoint) => {
  const today = moment().startOf("day");
  const existedTime = await Time.findOne({
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });

  if (existedTime) {
    if (existedTime.restStartPoint === 0) {
      throw new Error("휴식 시작 포인트가 0 에러입니다.");
    }
    if (existedTime.restStartPoint >= restEndPoint) {
      throw new Error(
        "휴식 종료 포인트가 휴식 시작 포인트보다 시간상 앞서 있습니다."
      );
    }
    existedTime.studyStartPoint = studyStartPoint;
    existedTime.savedRestTime += restEndPoint - existedTime.restStartPoint;
    existedTime.restStartPoint = 0;
    existedTime.restEndPoint = 0;
    await existedTime.save();
    return "Rest time has been accumulated.";
  } else {
    throw new Error("데이터가 없습니다.");
  }
};
