import {useEffect, useState} from "react";

export const useMultiAudio = (urls: Array<{ key: string, url: string }>): [any[], (key: string) => () => void] => {
    const [sources] = useState(
        urls.map(url => {
            return {
                ...url,
                audio: new Audio(url.url),
            }
        }),
    )

    const [players, setPlayers] = useState(
        urls.map(url => {
            return {
                ...url,
                playing: false,
            }
        }),
    )

    const toggle: (key: string) => () => void = (key: string) => () => {
        const newPlayers = [...players];
        const currentIndex = players.findIndex(p => p.playing === true);

        const targetIndex = sources.findIndex(el => el.key === key);
        if (currentIndex !== -1 && currentIndex !== targetIndex) {
            newPlayers[currentIndex].playing = false
            newPlayers[targetIndex].playing = true
        } else if (currentIndex !== -1) {
            newPlayers[targetIndex].playing = false
        } else {
            newPlayers[targetIndex].playing = true
        }
        setPlayers(newPlayers)
    };

    useEffect(() => {
        sources.forEach((source, i) => {
            if (players[i].playing) {
                source.audio.play();
            } else {
                source.audio.pause();
            }
        })
    }, [sources, players])

    useEffect(() => {
        sources.forEach((source, i) => {
            source.audio.addEventListener('ended', () => {
                const newPlayers = [...players]
                newPlayers[i].playing = false
                setPlayers(newPlayers)
            })
        })
        return () => {
            sources.forEach((source, i) => {
                source.audio.removeEventListener('ended', () => {
                    const newPlayers = [...players]
                    newPlayers[i].playing = false
                    setPlayers(newPlayers)
                })
            })
        }
    }, [players, sources])

    return [players, toggle];
};
