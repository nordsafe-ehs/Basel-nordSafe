const {
  Meeting,
  AgendaItem,
  Decision,
  OpenAction,
} = require("../models/Meeting.js");

// إنشاء اجتماع جديد مع الأجندة والقرارات والإجراءات المفتوحة
const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body, {
      include: [AgendaItem, Decision, OpenAction],
    });
    res.status(201).json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب كل الاجتماعات مع التفاصيل
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      include: [AgendaItem, Decision, OpenAction],
    });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب اجتماع محدد
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id, {
      include: [AgendaItem, Decision, OpenAction],
    });
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تحديث اجتماع (فقط بيانات الاجتماع نفسه)
const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    await meeting.update(req.body);
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف اجتماع مع كل التفاصيل المرتبطة
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    await meeting.destroy();
    res.json({ message: "Meeting deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ إضافة بند أجندة لاجتماع موجود
const addAgendaItem = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    const agendaItem = await AgendaItem.create({
      ...req.body,
      meetingId: meeting.id,
    });
    res.status(201).json(agendaItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ إضافة قرار لاجتماع موجود
const addDecision = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    const decision = await Decision.create({
      ...req.body,
      meetingId: meeting.id,
    });
    res.status(201).json(decision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ إضافة إجراء مفتوح لاجتماع موجود
const addOpenAction = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    const openAction = await OpenAction.create({
      ...req.body,
      meetingId: meeting.id,
    });
    res.status(201).json(openAction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ تحديث حالة إجراء مفتوح (مثلاً من Open إلى Closed)
const updateOpenActionStatus = async (req, res) => {
  try {
    const action = await OpenAction.findByPk(req.params.actionId);
    if (!action) return res.status(404).json({ error: "Action not found" });

    await action.update({ status: req.body.status });
    res.json(action);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  addAgendaItem,
  addDecision,
  addOpenAction,
  updateOpenActionStatus,
};
