import React, { useEffect, useRef, useState } from 'react';
import QuestionCategory from 'models/study/QuestionCategory';
import { Col, Form } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';
import studyApi from 'services/apis/study-api';
import './Study.scss';
import Input from 'components/Form/Input';
import { handleRawInputChange } from 'services/form-helpers';

interface Props {
    questionCategory: QuestionCategory;
    blurred?: boolean;
    reload: () => void;
}

const QuestionCategoryBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.questionCategory.name);

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.questionCategory.name);
    }, [props.questionCategory.name]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.questionCategory.name != itemName && !!itemName && !!itemName.trim())
            studyApi.updateQuestionCategory({ ...props.questionCategory, name: itemName }, props.reload);
    };

    const toggleCategory = () => {
        studyApi.updateQuestionCategory({ ...props.questionCategory, isSelected: !props.questionCategory.isSelected }, props.reload);
    };

    const deleteQuestionCategory = (questionCategoryId: number) => {
        studyApi.removeQuestionCategory(questionCategoryId, props.reload);
    };

    return (
        <Col sm={3} className={props.questionCategory.containsAllDifficulties && props.questionCategory.isSelected ? 'e-block-warning e-study-block' : 'e-study-block'} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <ReactLink to={`/questioncategory?questionCategoryId=${props.questionCategory.id}`}>
                <p className="e-study-block-link">
                    GO
                </p>
            </ReactLink>
            {!isEditing
                ? <>
                    {!props.blurred
                        ? <span>
                            {isHovering && <span className="e-pull-right e-delete-icon" onClick={() => deleteQuestionCategory(props.questionCategory.id)}>x</span>}
                            <span className="e-pull-left e-category-toggle">
                                <input onClick={() => toggleCategory()} type="radio" checked={props.questionCategory.isSelected} />
                            </span>
                            <span className="e-study-block-name" onClick={() => setIsEditing(true)}>{props.questionCategory.name}</span>
                        </span>
                        : <span className="e-blurred-text">
                            <span className="e-pull-left e-category-toggle">
                                <input onClick={() => toggleCategory()} type="radio" checked={props.questionCategory.isSelected} />
                            </span>
                            <span className="e-study-block-name">{props.questionCategory.name}</span>
                        </span>
                    }
                </>
                : <Input
                    ref={updateRef}
                    inputName={'Category Name'}
                    value={itemName}
                    handleInputChange={setItemName}
                    onBlur={saveUpdate} />
            }
        </Col>
    )
}

export default QuestionCategoryBlock;