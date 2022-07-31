import Page from 'components/Layout/PageLayout';
import React, { useEffect, useState } from 'react';
import './Study.scss';
import { useLocation } from 'react-router-dom';
import studyApi from 'services/apis/study-api';
import QuestionCategoryColumn from './QuestionCategoryColumn';
import GameQuestionCategory from 'models/study/GameQuestionCategory';
import Player from 'models/study/Player';
import GamePlayersColumn from './GamePlayersColumn';
import Game from 'models/study/Game';
import { Col, Row } from 'react-bootstrap';
import FinalGameQuestionBlock from './FinalGameQuestionBlock';
import GamePlayerBlock from './GamePlayerBlock';
import { sortByNumberPropertyAcsending, sortByNumberPropertyDescending } from 'services/array-helpers';
import { copyObject } from 'services/object-helper';

export type GameRoundType = "Single" | "Double" | "Final" | "Results";

const GameBoard = () => {
    const search = useLocation().search;
    const gameId = new URLSearchParams(search).get('gameId');

    const [game, setGame] = useState<Game>(new Game());
    const [gameCategories, setGameQuestionCategories] = useState<GameQuestionCategory[]>([]);
    const [finalCategory, setFinalCategory] = useState<GameQuestionCategory>(new GameQuestionCategory());
    const [players, setPlayers] = useState<Player[]>([]);
    const [sortedPlayersByMoney, setSortedPlayersByMoney] = useState<Player[]>([]);
    const [sortedPlayersById, setSortedPlayersById] = useState<Player[]>([]);
    const [intGameId, setIntGame] = useState<number>();
    const [toggleReload, setToggleReload] = useState<boolean>(false);
    const [gameRound, setGameRound] = useState<GameRoundType>("Single");

    useEffect(() => {
        var id = parseInt(gameId ?? "");
        if (!isNaN(id))
            setIntGame(id);
    }, [gameId]);

    useEffect(() => {
        loadGame();
        loadGameQuestionCategories();
        loadPlayers();
    }, [intGameId]);

    useEffect(() => {
        let newArray: Player[] = copyObject(players);
        setSortedPlayersByMoney(sortByNumberPropertyDescending(newArray, "amount"));
    }, [players]);

    useEffect(() => {
        let newArray: Player[] = copyObject(players);
        setSortedPlayersById(sortByNumberPropertyAcsending(newArray, "id"));
    }, [players]);

    useEffect(() => {
        var final = gameCategories.filter(c => c.gameQuestions.some(q => q.isFinal))[0];
        setFinalCategory(final);
    }, [gameCategories]);

    const reloadGame = () => {
        setToggleReload(!toggleReload);
        loadGameQuestionCategories();
        loadPlayers();
    }

    const loadGame = () => {
        if (!!intGameId)
            studyApi.getGame(intGameId, setGame);
    }

    const loadGameQuestionCategories = () => {
        if (!!intGameId)
            studyApi.getGameQuestionCategories(intGameId, setGameQuestionCategories);
    }

    const loadPlayers = () => {
        if (!!intGameId)
            studyApi.getPlayersForGame(intGameId, setPlayers);
    }

    const isQuestionInRound = (round: number) => {
        if (gameRound == 'Single' && round == 1)
            return true;
        if (gameRound == 'Double' && round == 2)
            return true;
        return false;
    }

    const getUsersPlace = (index: number) => {
        switch (index) {
            case 0:
                return <h1>1<sup>st</sup></h1>;
            case 1:
                return <h2>2<sup>nd</sup></h2>;
            case 2:
                return <h3>3<sup>rd</sup></h3>;
            default:
                return <h3>{index + 1}<sup>th</sup></h3>;
        }
    }

    return (
        <Page title={game.name ?? "loading..."} classNameExtension="study" saveUpdate={() => { }}>
            <GamePlayersColumn
                players={sortedPlayersByMoney}
                gameId={intGameId}
                reload={reloadGame}
                round={gameRound}
                setRound={setGameRound} />
            {(gameRound == "Single" || gameRound == "Double")
                ? gameCategories
                    .filter(c => c.gameQuestions.some(q => isQuestionInRound(q.round)))
                    .map((cat: GameQuestionCategory) =>
                        <QuestionCategoryColumn
                            key={cat.id}
                            categoryWithQuestions={cat}
                            players={sortedPlayersById}
                            toggleReload={toggleReload}
                            reload={reloadGame} />
                    )
                : <>
                    {gameRound == "Final"
                        ? <Col>
                            <FinalGameQuestionBlock
                                question={finalCategory.gameQuestions.filter(q => q.isFinal)[0]}
                                toggleReload={toggleReload}
                                players={players}
                                priceOverride={finalCategory.name ?? 'Final Question'}
                                reload={reloadGame} />
                        </Col>
                        : <Col className="e-results-section">
                            <Row>
                                <Col xs={1}>
                                </Col>
                                <Col className='e-study-block'>
                                    <Row>
                                        <Col>Player</Col>
                                        <Col>Score</Col>
                                        <Col>Right</Col>
                                        <Col>Wrong</Col>
                                    </Row>
                                </Col>
                            </Row>
                            {sortedPlayersByMoney.map((player: Player, index: number) => {
                                return <Row key={player.id}>
                                    <Col className="e-users-place" xs={1}>
                                        <span>{getUsersPlace(index)}</span>
                                    </Col>
                                    <GamePlayerBlock player={player} key={player.id} reload={reloadGame} isResults={true} />
                                </Row>
                            })}
                        </Col>
                    }
                </>
            }
        </Page>
    )
}

export default GameBoard;