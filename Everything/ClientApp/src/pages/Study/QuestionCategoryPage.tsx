import Page from 'components/Layout/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import './Study.scss';
import { Col, Row } from 'react-bootstrap';
import { handleRawInputChange } from 'services/form-helpers';
import { useLocation } from 'react-router-dom';
import studyApi from 'services/apis/study-api';
import Question from 'models/study/Question';
import QuestionBlock from './QuestionBlock';
import Input from 'components/Form/Input';
import QuestionCategory from 'models/study/QuestionCategory';

const QuestionCategoryPage = () => {
    const search = useLocation().search;
    const questionCategoryId = new URLSearchParams(search).get('questionCategoryId');

    const [category, setCategory] = useState<QuestionCategory>(new QuestionCategory());
    const [newQuestion, setNewQuestion] = useState<Question>(new Question());
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
    const [intQuestionCategoryId, setIntQuestionCategory] = useState<number>();

    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        var id = parseInt(questionCategoryId ?? "");
        if (!isNaN(id))
            setIntQuestionCategory(id);
    }, [questionCategoryId]);

    useEffect(() => {
        loadQuestions();
        loadCategory();
    }, [intQuestionCategoryId]);

    useEffect(() => {
        isAddingQuestion && addRef.current && addRef.current.focus();
    }, [isAddingQuestion]);

    const loadQuestions = () => {
        if (!!intQuestionCategoryId)
            studyApi.getQuestionsForCategory(intQuestionCategoryId, setQuestions);
    }

    const loadCategory = () => {
        if (!!intQuestionCategoryId)
            studyApi.getQuestionCategory(intQuestionCategoryId, setCategory);
    }

    const saveQuestion = () => {
        if (newQuestion.statement && !!newQuestion.statement.trim() && !!intQuestionCategoryId)
            studyApi.createQuestion({ ...newQuestion, categoryId: intQuestionCategoryId }, loadQuestions);
        setIsAddingQuestion(false);
        setNewQuestion(new Question());
    }

    const saveQuestionCategory = (newName: string) => {
        if (!!newName && !!newName.trim())
            studyApi.updateQuestionCategory({ ...category, name: newName }, loadCategory);
    }

    return (
        <Page title={category.name ?? ''} classNameExtension="study" saveUpdate={saveQuestionCategory}>
            {questions.map((question: Question) =>
                <QuestionBlock key={question.id} question={question} reload={loadQuestions} />
            )}
            <Col xs={3} className='e-question-block-col'>
                <div className='e-question-block e-clickable' onClick={() => setIsAddingQuestion(true)}>
                    <div className='e-question-statement-side'>
                        <div className="e-question-text">
                            {!isAddingQuestion
                                ? <p className='e-add-question'>Add +</p>
                                : <>
                                    <Input
                                        ref={addRef}
                                        inputName={'Category Name'}
                                        value={newQuestion.statement}
                                        handleInputChange={handleRawInputChange([newQuestion, setNewQuestion], "statement")}
                                        onBlur={saveQuestion}
                                        removeBottomMargin />
                                </>}
                        </div>
                    </div>
                </div>
            </Col>
        </Page>
    )
}

export default QuestionCategoryPage;