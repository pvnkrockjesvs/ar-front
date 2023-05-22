import styles from '../styles/Calendar.module.css'

function CalendarRow (props) {
    return (
        <tr className={styles.tableRow}>
            <td style={props.style} className={styles.tableData}>{props.artist}</td>
            <td style={props.style} className={styles.tableData}>{props.title}</td>
            <td style={props.style} className={styles.tableData}>{props.type}</td>
            <td style={props.style} className={styles.tableData}>{props.date}</td>
        </tr>
    )
}

export default CalendarRow