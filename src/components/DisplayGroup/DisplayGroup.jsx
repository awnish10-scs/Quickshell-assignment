import { useEffect, useState } from "react";

import Card from "../Card/Card";
import styles from "./DisplayGroup.module.css";

export default function DisplayGroup({ tickets, users, title, displayState, priority, sortByPriority }) {
    const [filter, setFilter] = useState(title);
    const [filterType, setFilterType] = useState("status");

    const [displayedTickets, setDisplayedTickets] = useState([]);

    useEffect(() => {
        switch (displayState) {
            case 0:
                setFilter(title);
                setFilterType("status");
                break;
            case 1:
                setFilter(priority);
                setFilterType("priority");
                break;
            case 2:
                setFilter(users.find(user => user.name === title).id);
                setFilterType("userId");
                break;
        }
    }, [displayState]);

    useEffect(() => {
        let unsortedTickets = tickets.filter(ticket => ticket[`${filterType}`] === filter);

        if (displayState === 0 || (displayState === 2 && sortByPriority))
            unsortedTickets.sort((a, b) => a.priority - b.priority);
        else if (displayState === 1 || (displayState === 2 && !sortByPriority))
            unsortedTickets.sort((a, b) => {
                const order = ["Todo", "Backlog", "In progress", "Done", "Canceled"];

                const value = x => {
                    switch (x) {
                        case order[0]:
                            return 4;
                        case order[1]:
                            return 3;
                        case order[2]:
                            return 2;
                        case order[3]:
                            return 1;
                        case order[4]:
                            return 0;
                    }
                }

                return value(b.status) - value(a.status);
            });

        setDisplayedTickets(unsortedTickets);
    }, [tickets, filter, filterType, sortByPriority]);

    return (
        <div className={styles["wrapper"]}>
            <header className={styles["header"]}>
                <div className={styles["header-left-group"]}>
                    <div>
                        {displayState === 2 ?
                            <img
                                className={styles["profile-pic"]}
                                id={users.find(user => user.id === filter)?.available ? styles["available"] : undefined}
                                src="default_profile_picture.jpg"
                            /> :
                            displayState === 1 ? <img className={styles["icon"]} src={`priority/${title}.svg`} /> :
                                <img className={styles["icon"]} src={`status/${title}.svg`} />
                        }
                    </div>
                    <div className={styles["title"]}>{title}</div>
                    <div className={styles["count"]}>{displayedTickets.length}</div>
                </div>
                <div className={styles["header-right-group"]}>
                    <div>&#65291;</div>
                    <div>&#8942;</div>
                </div>
            </header>
            {displayedTickets.map(ticket => <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId)} displayState={displayState} />)}
        </div>
    );
}
