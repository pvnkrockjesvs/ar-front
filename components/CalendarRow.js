//import styles from '../styles/Calendar.module.css'

function CalendarRow (props) {
    return (
        <tr >
            <td>{props.artist}</td>
            <td>{props.title}</td>
            <td>{props.type}</td>
            <td>{props.date}</td>
        </tr>
    )
}

export default CalendarRow