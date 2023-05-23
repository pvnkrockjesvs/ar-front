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
import Link from "next/link";
import ConflictSearchModal from "./ConflictSearchModal";

function Calendar() {

    const dates = ['2023-05-26', '2023-05-21', '2023-05-11', '2023-04-19', '2023-03-25', '2023-04-23', '2023-05-23', '2023-04-05', '2023-04-12', '2023-04-07', '2023-04-10',
                   '2023-05-28', '2023-05-12', '2023-05-02', '2023-05-05', '2023-05-09', '2023-05-10', '2023-05-17', '2023-04-29', '2023-04-15', '2023-04-27', '2023-04-28']

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

    const toggleCsModal = () => setCsModal(!csModal);
  
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
    
    // For each artist, search for releases that are associated with
    // types from the user profiles
    
    const getRecentReleases = async () =>{
        const releaseStore = []
        let nbFetches = 0
        let types = profile[0].releaseTypes
        //let types = ['album', 'single']
        for (let artist of artistList){
            for (let type of types) {
                // type= 'album'
                const resp = await fetch(`http://localhost:3000/artists/${artist.mbid}/${type}`)
                const data = await resp.json();
                if (data.result) {
                    // Remove releases that have only year information in their date key
                    const filtredData = data.releases.filter(release => (release.date && release.date.split('-').length >= 2))
                    if (filtredData){
                        // add the artist name and the release type to the data
                        const completedData = filtredData.map((ele) => (
                            {...ele,
                                artist: artist.name,
                                releaseType: type,
                                // date: dates[Math.floor(Math.random() * 22)]
                            }
                        ))
                        releaseStore.push(...completedData)
                    }
                }  else {
                    // console.log(`No release of ${type} for artist ${artist.name} was found`)
                }
                nbFetches = nbFetches + 1
                
            }

        }
        // sort the release data by date
        releaseStore = releaseStore.sort(( a, b ) => {
            return new Date(a.date) - new Date(b.date)
        })
        setRecentReleases([...recentReleases, ...releaseStore])
        setNbSearch(nbFetches)
    }
    
        
    useEffect(() => {
        if (!user.token) {
            return;
        }
        const sortedConflicts = profile[0].conflicts.sort()
        setConflictList(sortedConflicts)

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
            console.error('Fetch error :' , error)
        })        
                
    },[])

    useEffect(() => {
        getRecentReleases()
    }, [artistList])


    // update -- display the next or previous week
    useEffect(() => {
        const weekStarts = computeWeekStarts()
        setStartWeek(weekStarts[next + 1])
        setEndWeek(weekStarts[next])
    }, [next])


    let weekReleases = []
    if (recentReleases.length != 0){
        let filtredWeekReleases = recentReleases.filter(data => (new Date(data.date) >= startWeek) && (new Date(data.date) < endWeek) )
        if (filtredWeekReleases.length != 0){
            weekReleases = filtredWeekReleases.map((data, index) => {
                let date = data.date.split('-').reverse().join('-')
                let releaseStyle = {}
                if (data.releaseType === 'album'){
                    releaseStyle = { 'backgroundColor': '#b3e5d1', 'color' : '#0d47a1' }
                } else if ( data.releaseType === 'single') {
                    releaseStyle = { 'backgroundColor': '#D9E3F0', 'color' : '#0d47a1' }
                } else {
                    releaseStyle = { 'backgroundColor': '#FFCDD2', 'color' : '#0d47a1' }
                }
                return <CalendarRow
                    style={releaseStyle}
                    key={index}
                    artist={data.artist.charAt(0).toUpperCase() + data.artist.slice(1)}
                    title={data.title}
                    type={data.releaseType}
                    date={date}/>
            })
        }
    }

    let myArtistList = []
    if (artistList) {
        myArtistList = artistList.map((artist, i) => {
            return (
                <li key={i} className={styles.artistName}>
                    <Link href={`/artist/${artist.mbid}`}>
                        <span className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                            {artist.name}
                        </span>
                    </Link>
                 </li>
            )
        })
    }

    let myConflicts = []
    if (conflictList) {
        myConflicts = conflictList.map((artist, i) => {
            return (
                <li key={i} className={styles.artistName}>
                    <span onClick={toggleCsModal} className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                        {artist}
                    </span>
                    <ConflictSearchModal
                        artistName={artist}
                        show={csModal}
                        dismissible={true}
                        onClose={toggleCsModal}
                    />
                 </li>
            )
        })
    }

    let searchEnded = (nbSearch === (artistList.length *  profile[0].releaseTypes.length))

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
                    {!searchEnded ? 
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