import React, {useRef, useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({setCurrentSong, currentSong, songs, setSongs, audioRef, songInfo, setSongInfo, isPlaying, setIsPlaying}) => {

    useEffect(async () => {
        const newSongs = songs.map(song => {
            if(song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });
        await setSongs(newSongs);
        if(isPlaying) {
            audioRef.current.play()
        }
    }, [currentSong])

    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => (song.id === currentSong.id));
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        };
        if (direction === 'skip-back') {
            if(currentIndex !== 0) {
                setCurrentSong(songs[currentIndex - 1]);
            } else {
                setCurrentSong(songs[songs.length - 1])
            }
        };
    }

    //styles and animations
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    const inputColor = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={inputColor} className="track">
                    <input 
                        onChange={dragHandler} 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        type="range">
                    </input>
                    <div className="animate-track" style={trackAnimation}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" icon={faAngleLeft} size="2x" />
                <FontAwesomeIcon onClick={playSongHandler} className="play" icon={isPlaying ? faPause : faPlay} size="2x" />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" icon={faAngleRight} size="2x" />
            </div>
        </div>
    )
}

export default Player;