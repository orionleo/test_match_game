"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Data from "@/data"
import axios from "axios";

interface Drink {
  id: number;
  name: string;
  img: string;
  matched: boolean;
}
function GameBoard() {
  //All the variables/states needed/maintained
  const [drinksArray, setDrinksArray] = useState<Drink[]>([]);
  const [moves, setMoves] = useState(0);
  const [firstCard, setFirstCard] = useState<Drink | null>(null);
  const [secondCard, setSecondCard] = useState<Drink | null>(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [won, setWon] = useState(0);
  const [timer, setTimer] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  async function NewGame() {
    setLoading(true);
    const res = await axios.get('/api/fetchData')
    const data = res.data.data as Drink[]
    const randomOrderArray = data.sort(() => 0.5 - Math.random());
    // const randomOrderArray = Data.sort(() => 0.5 - Math.random());
    setDrinksArray(randomOrderArray);
    setMoves(0);
    setFirstCard(null);
    setSecondCard(null);
    setWon(0);
    setTimer(-1);
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }

  //all the functions needed
  function handleSelectedCards(item: Drink) {
    if (moves === 0 && firstCard === null) {

      setTimer(0);
    }
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  }
  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevValue) => prevValue + 1);
  }

  //All the useEffects needed

  useEffect(() => {

    NewGame();
  }, []);


  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setDrinksArray((prevArray) => {
          return prevArray.map((card) => {
            if (card.name === firstCard.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setWon((preVal) => preVal + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 500);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (won === 6) {
      setStopFlip(true);
    }
  }, [won]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (won !== 6 && timer != -1) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, won]);



  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-[10px] justify-center items-center">
        <h1 className="self-start text-[2.5rem] text-white">Memory Game</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <h1 className="self-start text-[2.5rem] text-white">Timer: {timer >= 0 ? timer : 0}</h1>
      </div>

      {!loading ? (<div className="grid m-auto mt-[1rem] grid-cols-[repeat(4,9rem)] place-items-center gap-y-[2rem] gap-x-8">
        {

          drinksArray.map((item) => {
            return (
              item !== undefined && <Card
                item={item}
                key={item.id}
                handleSelectedCards={handleSelectedCards}
                toggled={
                  item === firstCard ||
                  item === secondCard ||
                  item.matched === true
                }
                stopFlip={stopFlip}
              />
            )
          })
        }
      </div>) : (<div className=" mx-[10px] flex flex-col items-center justify-center rounded-lg min-h-[50vh] text-white p-4">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>)}

      {won !== 6 ? (
        <div className="py-[0.25rem] px-[1rem] bg-white m-auto mt-[40px] text-center rounded-[2rem]">Moves : {moves}</div>
      ) : (
        <div className="py-[0.25rem] px-[1rem] bg-white m-auto mt-[40px] text-center rounded-[2rem]">
          You Won in {moves} moves and in {timer} seconds
        </div>
      )}
      <div className="flex justify-center pt-[50px]">
        <button className="flex my-[30px] items-center justify-center py-[0.5rem] px-[0.8rem] w-[200px] text-[1.2rem] font-bold rounded-[0.7rem] border-none bg-red-600 text-white mt-[4px]  hover:border-2 hover:border-solid hover:border-black hover:cursor-pointer"
          onClick={NewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
