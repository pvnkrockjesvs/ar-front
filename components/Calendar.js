/* This component generates the calendar for a given user.
it lists the album that will be released for a given period (one week at a time).
The periods are the current, the 4 previous and the next weeks.
The algorithm steps:
    1. Get the user artist list from the store
    2. for each artist, get the recent and upcoming releases according to the type of release.
    3. Compare the data of release of the album (the first release) to the period of interest.
    4. Display the album if it is within the period of interest.

    THIS COMPONENT IS STILL IN PROGRESS......
*/
import styles from '../styles/Calendar.module.css'
import CalendarRow from './CalendarRow'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LoaderMusic from "./LoaderMusic";
import ConflictSearchModal from "./ConflictSearchModal";
import { useDispatch } from "react-redux";
import { storeProfile } from "../reducers/profile";
import { useRouter } from 'next/router';

function Calendar() {

    const user = useSelector((state) => state.user.value)
    const profile = useSelector((state) => state.profile.value)

    const [artistList, setArtistList] = useState([])
    const [conflictList, setConflictList] = useState([])

    const [recentReleases, setRecentReleases] = useState([])
    // to decide which week
    const [next, setNext] = useState(1)
    const [startWeek, setStartWeek] = useState(new Date())
    const [endWeek, setEndWeek] = useState()
    const [nbSearch, setNbSearch] = useState(0)
    const [title, setTitle] = useState('')
    const [csModal, setCsModal] = useState(false);
    const [arconf, setArconf] = useState('')
    const [myArtists, setMyArtists] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter()

    const toggleCsModal = (ar) => {
        setArconf(ar)
        setCsModal(!csModal) 
    };
  
    function sleep(delay = 0) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
    const username = user.username

    
    // https://askjavascript.com/how-to-get-first-and-last-day-of-the-current-week-in-javascript/
    const computeWeekStarts = () => {
        const weeksStart = []
        let dt = new Date()
        // get the start of the current week
        let startOfCurrentWeek = dt.getDate() - dt.getDay() + (dt.getDay() === 0? -6 : 1)
        // get the start of the next week
        let startOfRefWeek = startOfCurrentWeek + 14
        // get the date of the start of the next week
        let startDate = dt.setDate(startOfRefWeek)
        dt = new Date(startDate)
        for (let i = 0; i < 10; i++){
            weeksStart.push(new Date(dt))
            // get the start date of the previous week
            dt.setDate(dt.getDate() - 7)
        }
        return weeksStart
    }
        
    const handleRightClick = () => {
        setNext(next - 1)
    }
    
    const handleLeftClick = () => {
        setNext(next + 1)
    }
    
    useEffect(() => {
        if (!user.token) {
            return;
        }
        if (profile.conflicts) {
            const sortedConflicts = profile.conflicts.sort()
            setConflictList(sortedConflicts)
        }


        username.charAt(username.length-1) === 's' ? setTitle(username+"'") : setTitle(username+"'s")

        const weekStarts = computeWeekStarts()
        setStartWeek(weekStarts[next + 1])
        setEndWeek(weekStarts[next])        
        fetch(`http://localhost:3000/profiles/myartists/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                let sortedArtists = data.artists.sort( (a, b) => { return a.name.localeCompare(b.name)})
                setArtistList(sortedArtists)
            }
        })
        .catch((error) => {
            console.error('Fetch artist list error :' , error)
        })
    },[myArtists])

    // Get the recent releases    
    useEffect(() => {
        if (!user.token){
            return;
        }
        const weekStarts = computeWeekStarts()
        setStartWeek(weekStarts[next + 1])
        setEndWeek(weekStarts[next])  
        fetch(`http://localhost:3000/profiles/myreleases/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                // console.log('Fetched Date:', data)
                setRecentReleases([...data.data])
                setMyArtists(true)
            }
        })
        .catch((error) => {
            console.error('Fetch recent release error :' , error)
        })        
                
    },[artistList])

    // update -- display the next or previous week
    useEffect(() => {
        const weekStarts = computeWeekStarts()
        setStartWeek(weekStarts[next + 1])
        setEndWeek(weekStarts[next])
    }, [next])

    let searchEnded = true
    let weekReleases = []
    if (recentReleases.length != 0){
        let filtredWeekReleases = recentReleases.filter(data => (new Date(data[0].date) >= startWeek) && (new Date(data[0].date) < endWeek) )
        if (filtredWeekReleases.length != 0){
            weekReleases = filtredWeekReleases.map((data, index) => {
                let releaseDate = new Date(data[0].date)
                //console.log('Release Date:', releaseDate)
                let releaseYear = releaseDate.getUTCFullYear()
                let releaseMonth = releaseDate.getUTCMonth() + 1 > 9? releaseDate.getUTCMonth() + 1 : '0'+(releaseDate.getUTCMonth() + 1)
                let releaseDay = releaseDate.getUTCDate() > 9 ? releaseDate.getUTCDate() : '0'+(releaseDate.getUTCDate())
                let date = `${releaseDay}-${releaseMonth}-${releaseYear}`

                let releaseStyle = {}
                if (data[0].type === 'Album'){
                    releaseStyle = { 'backgroundColor': '#b3e5d1', 'color' : '#0d47a1' }
                } else if ( data[0].type === 'Single') {
                    releaseStyle = { 'backgroundColor': '#D9E3F0', 'color' : '#0d47a1' }
                } else if (data[0].type === 'Ep') {
                    releaseStyle = { 'backgroundColor': '#FFCDD2', 'color' : '#0d47a1' }
                }
                return <CalendarRow
                    style={releaseStyle}
                    key={index}
                    artist={<span className="cursor-pointer items-center font-medium dark:text-blue-500 hover:underline " onClick={() => router.push(`/artist/${data[0].arid}`)}>{data[0].arname.charAt(0).toUpperCase() + data[0].arname.slice(1)}</span>}
                    title={<span className="cursor-pointer items-center font-medium dark:text-blue-500 hover:underline" onClick={() => router.push(`/release/${data[0].mbid}`)}>{data[0].title}</span>}
                    type={data[0].type}
                    date={date}/>
            })
        }
    }
    // console.log('WEEK RELEASE LENGTH:', weekReleases.length)

    let myArtistList = []
    if (artistList) {
        myArtistList = artistList.map((artist, i) => {
            return (
                <li key={i} className={styles.artistName}>
                    <span onClick={() => router.push(`/artist/${artist.mbid}`)} className="items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                        {artist.name}
                    </span>
                 </li>
            )
        })
    }

    let myConflicts = []
    if (conflictList.length > 0) {
        myConflicts = conflictList.map((artistConf, i) => {
            return (
                <li key={i} className={styles.artistName}>
                    <span onClick={() => toggleCsModal(artistConf)} 
                    className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 
                    hover:underline cursor-pointer">
                        {artistConf}
                    </span>
                 </li>
            )
        })
    }

    //let searchEnded = (nbSearch === (artistList.length *  profile.releaseTypes.length))
    return (
        <div className={styles.calendarContainer}>
            <div className={styles.leftPart}>
                <div className={styles.artistListContainer}>
                    <h1> 
                        {title} artist list
                    </h1>
                    <ul className={styles.artistList} >
                        {myArtistList}
                    </ul>
                </div>
                <div className={styles.artistListContainer}>
                    <h1> 
                        {title} artist conflicts
                    </h1>
                    <ul className={styles.artistList} >
                        {myConflicts}
                    </ul>
                </div>
                <ConflictSearchModal
                        artistName={arconf}
                        show={csModal}
                        dismissible={true}
                        onClose={() => toggleCsModal('')}
                        myArtists={artistList}
                    
                    />
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    {next < 6 ? 
                    (
                        <FontAwesomeIcon className={styles.iconButton} icon={faArrowLeft} style={{color: "#ff8080"}} onClick={() => handleLeftClick()}/>
                    ):
                    (
                        <FontAwesomeIcon className={styles.iconButton} icon={faArrowLeft} style={{color: "#ffcdd2"}}/>
                    )}
                    <p className={styles.weekName}>
                        {startWeek.getUTCDate() > 9 ? startWeek.getUTCDate() : '0'+(startWeek.getUTCDate())}-
                        {startWeek.getUTCMonth() + 1 > 9? startWeek.getUTCMonth() + 1 : '0'+(startWeek.getUTCMonth() + 1)}-
                        {startWeek.getUTCFullYear()}                        
                    </p>
                    { next > 0 ? 
                    ( <FontAwesomeIcon className={styles.iconButton} icon={faArrowRight} style={{color: "#ff8080"}} onClick={() => handleRightClick()}/>
                    ):
                    (
                        <FontAwesomeIcon className={styles.iconButton} icon={faArrowRight} style={{color: "#ffcdd2"}}/>
                    )}
                </div>
                <div className={styles.tableWrapper}>
                    {recentReleases.length === 0 ? 
                    (
                        <div className={styles.calendarErrorContainer}>
                            <p className={styles.calendarErrorMessage}> Searching for possible recent releases</p>
                            <LoaderMusic />
                        </div>
                    ) : ( weekReleases.length != 0) ? 
                    (
                        <div>
                            <CalendarRow
                                style={ {'backgroundColor': '#0d47a1', 'color': '#fff', 'fontWeight' : 'bold', 'top' : '0', 'position' : 'sticky'}}
                                key={0}
                                artist={'ARTIST'}
                                title={'TITLE'}
                                type={'RELEASE TYPE'}
                                date={'RELEASE DATE'}/>
                            {weekReleases}
                        </div>
                    ) :  
                    (
                        <div className={styles.calendarErrorContainer}>
                            <p className={styles.calendarErrorMessage}> No release found for this week</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calendar