import { useEffect, useState } from "react";
import DisplayGroup from "../../components/DisplayGroup/DisplayGroup";

import styles from "./DisplayPage.module.css";

export default function DisplayPage() {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);

    const statusArray = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
    const priorityArray = ["Urgent", "High", "Medium", "Low", "No Priority"];
    const userArray = users.slice(0, 5).map(user => user.name);

    const stateArray = [statusArray, priorityArray, userArray];

    const [displayState, setDisplayState] = useState(Number(localStorage.getItem("displayState")) ?? 0);
    const [sortByPriority, setSortByPriority] = useState(Number(localStorage.getItem("sortByPriority")) ?? 1);

    useEffect(() => {
        fetch("https://apimocha.com/quicksell/data").then(async res => {
            let data = await res.json();
            setTickets(data.tickets);
            setUsers(data.users);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("displayState", displayState);
    }, [displayState]);

    useEffect(() => {
        localStorage.setItem("sortByPriority", sortByPriority);
    }, [sortByPriority]);

    return <>
        <header className={styles["header"]}>
            <div className={styles["display-settings"]}>
                Display (group by):&nbsp;
                <select value={displayState} onChange={e => setDisplayState(Number(e.target.value))}>
                    <option value="0">Status</option>
                    <option value="1">Priority</option>
                    <option value="2">User</option>
                </select>
                {displayState === 2 ?
                    <>
                        &nbsp;Sort by:&nbsp;
                        <select value={sortByPriority} onChange={e => setSortByPriority(Number(e.target.value))}>
                            <option value="1">Priority</option>
                            <option value="0">Status</option>
                        </select>
                    </> :
                    <></>
                }
            </div>
        </header>
        <div className={styles["group-wrapper"]}>
            {stateArray[displayState].map((title, index) => {
                return <DisplayGroup key={index} tickets={tickets} users={users} title={title} displayState={displayState} priority={index} sortByPriority={sortByPriority} />
            })}
        </div>
    </>;
}
