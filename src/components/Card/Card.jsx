import { useState, useEffect } from "react";

import styles from "./Card.module.css"

export default function Card({ ticket, user, displayState }) {
    const [priorityIcon, setPriorityIcon] = useState("");

    useEffect(() => {
        switch (ticket.priority) {
            case 0:
                setPriorityIcon("Urgent.svg")
                break;
            case 1:
                setPriorityIcon("High.svg");
                break;
            case 2:
                setPriorityIcon("Medium.svg");
                break;
            case 3:
                setPriorityIcon("Low.svg");
                break;
            case 4:
                setPriorityIcon("No Priority.svg")
                break;
        }
    }, [ticket]);

    return (
        <div className={styles["wrapper"]}>
            <header className={styles["header"]}>
                <div className={styles["id"]}>{ticket.id}</div>
                {displayState !== 2 ? <img className={styles["profile-picture"]} id={user.available ? styles["available"] : undefined} src="default_profile_picture.jpg" /> : <></>}
            </header>
            <div className={styles["title"]}>{ticket.title}</div>
            <div className={styles["tag-wrapper"]}>
                {displayState !== 0 ? <div className={styles["tag"]}><img className={styles["icon"]} src={`status/${ticket.status}.svg`} /></div> : <></>}
                {displayState !== 1 ? <div className={styles["tag"]}><img className={styles["icon"]} src={`priority/${priorityIcon}`} /></div> : <></>}
                {ticket.tag.length > 0 ? ticket.tag.map((tag, i) => <div key={i} className={styles["tag"]}>&#9679; {tag}</div>) : <></>}
            </div>
        </div>
    );
}
