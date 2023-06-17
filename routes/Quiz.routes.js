const express = require("express");
const { QuizModel } = require("../model/quiz.model");
const quizRouter = express.Router();

quizRouter.post("/create", async (req, res) => {
  try {
    const quiz = await QuizModel.create(req.body);
    res.status(201).send(quiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

quizRouter.get("/", async (req, res) => {
  try {
    const quiz = await QuizModel.find();
    res.status(200).send(quiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

quizRouter.delete("/:id", async (req, res) => {
  let { email } = req.query;
  try {
    const quiz = await QuizModel.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    // console.log(email, quiz.creator);

    if (email != quiz.creator) {
      return res.status(403).send("You are not authorized to delete this quiz");
    }

    await quiz.deleteOne({ _id: req.params.id });
    res.status(200).send("Quiz deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Modify the title and description of a quiz
quizRouter.put("/:id", async (req, res) => {
  let { email } = req.query;
  try {
    const quiz = await QuizModel.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    // console.log(email, quiz.creator);
    if (email != quiz.creator) {
      return res.status(403).send("You are not authorized to modify this quiz");
    }

    quiz.title = req.body.title;
    quiz.description = req.body.description;
    await quiz.save();
    res.status(200).send("Quiz modified successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  quizRouter,
};
