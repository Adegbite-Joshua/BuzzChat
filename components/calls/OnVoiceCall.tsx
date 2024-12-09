import { CallEndOutlined, MicNoneOutlined, MicOffOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

export default function OnVoiceCall() {
    const [audioToggles, setAudioToggles] = useState({
        audio: true,
    });
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const getAudioStream = async () => {
            try {
                // Only request audio if enabled
                if (audioToggles.audio) {
                    const audioStream = await navigator.mediaDevices.getUserMedia({
                        audio: true,  // Only audio
                    });
                    setStream(audioStream);
                } else {
                    // Stop the current stream when audio is disabled
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                    }
                    setStream(null); // Clear the stream
                }
            } catch (error) {
                console.error('Error accessing audio:', error);
            }
        };

        getAudioStream();

        return () => {
            // Clean up on unmount or when toggling audio
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [audioToggles.audio]);


    const toggleAudio = () => setAudioToggles({ ...audioToggles, audio: !audioToggles.audio });

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const startDrag = (e: { clientX: number; clientY: number; }) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const onDrag = (e: { clientX: number; clientY: number; }) => {
        if (dragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const stopDrag = () => setDragging(false);

    return (
        <div
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onMouseDown={startDrag}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: "grab",
            }}
            className="absolute z-20 bottom-0 right-0 w-80 h-60 bg-slate-500 bg-opacity-20 flex items-center justify-center"
        >
            {/* Voice Call Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Audio */}
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-lg">
                        <p>Voice Call</p>
                    </div>
                </div>
                <div className="flex-1 bg-black">
                    {/* Voice call stream */}
                    {audioToggles.audio && stream && (
                        <audio
                            autoPlay
                            muted
                            ref={(audioElement) => {
                                if (audioElement && stream) {
                                    audioElement.srcObject = stream;
                                }
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 w-full flex justify-center space-x-4">
                <button
                    className={`p-2 text-white rounded-full ${audioToggles.audio ? 'bg-blue-500' : 'bg-gray-500'}`}
                    onClick={toggleAudio}
                >
                    {audioToggles.audio ? <MicOffOutlined /> : <MicNoneOutlined />}
                </button>
                <button
                    className="p-2 bg-red-500 text-white rounded-full"
                    onClick={() => console.log('Call Ended')}
                >
                    <CallEndOutlined />
                </button>
            </div>
        </div>
    );
}


// export default function OnVoiceCall() {
//     const [audioToggles, setAudioToggles] = useState({ audio: true });
//     const [stream, setStream] = useState<MediaStream | null>(null);

//     useEffect(() => {
//         const getAudioStream = async () => {
//             try {
//                 // Only request audio if enabled
//                 if (audioToggles.audio) {
//                     const audioStream = await navigator.mediaDevices.getUserMedia({
//                         audio: true,  // Only audio
//                     });
//                     setStream(audioStream);
//                 } else {
//                     // Stop the current stream when audio is disabled
//                     if (stream) {
//                         stream.getTracks().forEach(track => track.stop());
//                     }
//                     setStream(null); // Clear the stream
//                 }
//             } catch (error) {
//                 console.error('Error accessing audio:', error);
//             }
//         };

//         getAudioStream();

//         return () => {
//             // Clean up on unmount or when toggling audio
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, [audioToggles.audio]);

//     // Toggle audio on and off
//     const toggleAudio = () => setAudioToggles({ audio: !audioToggles.audio });

//     return (
//         <div className="absolute z-20 bottom-0 right-0 w-80 h-60 bg-slate-500 bg-opacity-20 flex items-center justify-center">
//             <div className="relative w-full h-full flex">
//                 <div className="flex-1 bg-black">
//                     {/* Voice call stream */}
//                     {audioToggles.audio && stream && (
//                         <audio
//                             autoPlay
//                             muted
//                             ref={(audioElement) => {
//                                 if (audioElement && stream) {
//                                     audioElement.srcObject = stream;
//                                 }
//                             }}
//                         />
//                     )}
//                 </div>
//             </div>

//             {/* Controls */}
//             <div className="absolute bottom-4 w-full flex justify-center space-x-4">
//                 <button
//                     className={`p-2 text-white rounded-full ${audioToggles.audio ? 'bg-blue-500' : 'bg-gray-500'}`}
//                     onClick={toggleAudio}
//                 >
//                     {audioToggles.audio ? <MicOffOutlined /> : <MicNoneOutlined />}
//                 </button>
//             </div>
//         </div>
//     );
// }
