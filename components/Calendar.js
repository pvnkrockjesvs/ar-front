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

function Calendar() {

    const dates = ['2023-05-26', '2023-05-21', '2023-05-11', '2023-04-19', '2023-03-25', '2023-04-23', '2023-05-23', '2023-04-05', '2023-04-12', '2023-04-07', '2023-04-10',
                   '2023-05-28', '2023-05-12', '2023-05-02', '2023-05-05', '2023-05-09', '2023-05-10', '2023-05-17', '2023-04-29', '2023-04-15', '2023-04-27', '2023-04-28']

    const profile = useSelector((state) => state.profile.value);
    const user = useSelector((state) => state.user.value)

    const [artistList, setArtistList] = useState([])
    const [recentReleases, setRecentReleases] = useState([])
    // to decide which week
    const [next, setNext] = useState(1)
    const [startWeek, setStartWeek] = useState(new Date())
    const [endWeek, setEndWeek] = useState()

    
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
    
    // Research Example
    //https://musicbrainz.org/ws/2/release?artist=494e8d09-f85b-4543-892f-a5096aed1cd4&fmt=json&inc=release-groups&type=album|ep|single&limit=100&offset=300
    /*
    
    let artistList = [
        {
            name: 'John Williams-1',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-2',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-3',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-4',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-5',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-6',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-7',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-8',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-9',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-10',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-11',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-12',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-13',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-14',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
        {
            name: 'John Williams-15',
            mbid: '53b106e7-0cc6-42cc-ac95-ed8d30a3a98e'
        },
    ]
    
    let types = ['album', 'single']
    */
  
    // For each artist, search for releases that are associated with
    // types from the user profiles
    const getRecentReleases = async () =>{
        const releaseStore = []
        let types = profile[0].releaseTypes
        for (let artist of artistList){
            console.log(artist.name)
            for (let type of types) {
                const resp = await fetch(`http://localhost:3000/artists/${artist.mbid}/${type}`)
                const data = await resp.json();
                if (data.result) {
                    // Remove releases that have only year information in their date key
                    const filtredData = data.releases.filter(release => release.date.split('-').length >= 2)
                    if (filtredData){
                        // add the artist name and the release type to the data
                        const completedData = filtredData.map((ele) => (
                            {...ele,
                                artist: artist.name,
                                releaseType: type,
                                date: dates[Math.floor(Math.random() * 22)]
                            }
                        ))
                        releaseStore.push(...completedData)
                    }
                }  else {
                    console.log(`No release of ${type} for artist ${artist.name} was found`)
                }
            }
        }
        // sort the release data by date
        releaseStore = releaseStore.sort(( a, b ) => {
            return new Date(a.date) - new Date(b.date)
        })
        setRecentReleases([...recentReleases, ...releaseStore])  
    }
    
    useEffect(() => {
        if (!user.token) {
            return;
        }
        
        fetch(`http://localhost:3000/profiles/myartists/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                //console.log(data.artists)
                setArtistList(data.artists)
            }
        })
        .catch((error) => {
            console.error('Fetch error :' , error)
        })
        
        getRecentReleases()
        const weekStarts = computeWeekStarts()
        setStartWeek(weekStarts[next + 1])
        setEndWeek(weekStarts[next])
    },[])

    // update -- display the next or previous week
    useEffect(() => {
        const weekStarts = computeWeekStarts()
        setStartWeek(weekStarts[next + 1])
        setEndWeek(weekStarts[next])
    }, [next])


    let weekReleases = []
    console.log()
    if (recentReleases.length != 0){
        weekReleases = recentReleases.map((data, index) => {
            if ( (new Date(data.date) >= startWeek) && (new Date(data.date) < endWeek) ) {
                let date = data.date.split('-').reverse().join('-')
                let releaseStyle = {}
                if (data.releaseType === 'album'){
                    releaseStyle = { 'backgroundColor': '#b3e5d1' }
                } else if ( data.releaseType === 'single') {
                    releaseStyle = { 'backgroundColor': '#D9E3F0' }
                } else {
                    releaseStyle = { 'backgroundColor': '#FFCDD2' }
                }
                return <CalendarRow
                    style={releaseStyle}
                    key={index}
                    artist={data.artist.charAt(0).toUpperCase() + data.artist.slice(1)}
                    title={data.title}
                    type={data.releaseType}
                    date={date}/>
            }
        })
    }

    let myArtistList = []
    if (artistList) {
        myArtistList = artistList.map((artist, i) => {
            const link = `/artist/${artist.mbid}`
            return (<li key={i} className={styles.artist}>{artist.name}</li>
            )
        })
    }

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.leftPart}>
                <div className={styles.artistListContainer}>
                    <h1> 
                        {user.username.charAt(user.username.length-1) === 's' ? user.username+"' releases" : user.username+"'s releases"}
                    </h1>
                    <ul className={styles.artistList} >
                        {myArtistList}
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
                        <FontAwesomeIcon className={styles.iconButton} icon={faArrowLeft} style={{color: "#000000"}}/>
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
                        <FontAwesomeIcon className={styles.iconButton} icon={faArrowRight} style={{color: "#000000"}}/>
                    )}
                </div>
                <div className={styles.tableWrapper}>
                    {(weekReleases.length !== 0) ? 
                    (
                        <table className={styles.table}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th className={styles.textHeader} style={{'width': '20%', 'textAlign': 'center'}}>ARTIST</th>
                                    <th className={styles.textHeader} style={{'width': '60%'}}>TITLE</th>
                                    <th className={styles.textHeader} style={{'width': '10%'}}>RELEASE TYPE</th>
                                    <th className={styles.textHeader} style={{'width': '10%'}}>DRELEASE DATE</th>
                                </tr>
                            </thead>
                            <tbody className={styles.textBody}>
                                {weekReleases}
                            </tbody>
                        </table>
                    ):
                    (
                        <div className={styles.calendarError}>
                            <p>Sorry</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calendar