import styles from '../styles/Calendar.module.css'

function CalendarRow (props) {
    return (
        <div style={props.style} className={styles.calendarRow}>
            <span className={styles.calendarCell}>{props.artist}</span>
            <span className={styles.calendarCell}>{props.title}</span>
            <span className={styles.calendarCell}>{props.type}</span>
            <span className={styles.calendarCell}>{props.date}</span>
        </div>
    )
}

export default CalendarRow