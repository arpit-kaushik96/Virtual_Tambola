import { useEffect, useState } from "react";
import NumbersWithRhymes from '../constants/numberWithRhymes.json';

const LandingPage = () => {

    const tambolalength = new Array(90);

    const [tambolaNumbers, setTambolaNumbers]: any = useState([]);
    const [totalNumbersLeft, setTotalNumbersLeft] = useState([]);

    useEffect(() => {
        const nums: any = [];
        const totalNums: any = [];
        if (totalNumbersLeft.length === 0 && tambolaNumbers.length === 0) {
            tambolalength.fill('').forEach((i, index: any) => {
                totalNums.push(index + 1);
                nums.push({ number: index + 1, active: false });
            })
            setTotalNumbersLeft(totalNums);
            setTambolaNumbers(nums);
        }
    }, [tambolaNumbers])

    const onShuffle = (): any => {

        const newNumber = getRandom();
        const newNumberIndex = totalNumbersLeft.indexOf(newNumber);
        totalNumbersLeft.splice(newNumberIndex, 1);
        speechSynthesis.speak(new SpeechSynthesisUtterance(` ${newNumber} ${NumbersWithRhymes[newNumber]}`));
        updateNewNumberOnBoard(newNumber);

    }

    const updateNewNumberOnBoard = (newNumber: any) => {
        for (let i = 0; i < tambolaNumbers.length; i++) {
            if (tambolaNumbers[i].number === newNumber) {
                tambolaNumbers[i].active = true;
            }
        }
        setTambolaNumbers([...tambolaNumbers]);
    }

    const getRandom = () => {
        return totalNumbersLeft[Math.floor((Math.random() * totalNumbersLeft.length))];
    }

    return (
        <div>
            <header className="header">Welcome to TVB (Tambola Virtual Board)</header>
            <div className="grid-container">
                {tambolaNumbers.map((item: any, index:any) => {
                    return (
                        <div key={item.number.toString()} className={`grid-item ${item.active ? `active-cell` : ``}`}>{item.number}</div>
                    )
                })}
            </div>

            <button onClick={() => onShuffle()} className="button-shuffle">
                Shuffle
            </button>
        </div>
    )
}

export default LandingPage;