package com.junkcartrader.junkcartraderapp.DataModel;

import java.util.List;

/**
 * Created by hassanbaig on 2/7/2015.
 */
public class Questionnaire {
    private List<String> Questions;
    private List<String> Answers;

    public Questionnaire() {
    }

    public List<String> getQuestions() {
        return Questions;
    }

    public void setQuestions(List<String> questions) {
        Questions = questions;
    }

    public List<String> getAnswers() {
        return Answers;
    }

    public void setAnswers(List<String> answers) {
        Answers = answers;
    }




}
