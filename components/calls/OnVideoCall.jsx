import { AspectRatioOutlined, CallEndOutlined, CameraswitchOutlined, MicNoneOutlined, MicOffOutlined, VideocamOffOutlined, VideocamOutlined, ScreenShareOutlined, StopScreenShareOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

export default function OnVideoCall({ isCaller = false }) {
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [videoToggles, setVideoToggles] = useState({
        video: true,
        audio: true,
    });
    const [stream, setStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null); // To store the screen share stream
    const [cameras, setCameras] = useState([]);
    const [currentCamera, setCurrentCamera] = useState(0);
    const [isScreenSharing, setIsScreenSharing] = useState(false); // To track if screen sharing is active

    useEffect(() => {
        const getCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameras(videoDevices);

                if (videoDevices.length > 0) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { deviceId: videoDevices[0].deviceId },
                        audio: videoToggles.audio,
                    });
                    setStream(stream);
                }
            } catch (error) {
                console.error('Error accessing cameras:', error);
            }
        };

        getCameras();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const switchCamera = async () => {
        if (cameras.length > 1) {
            const nextCameraIndex = (currentCamera + 1) % cameras.length;
            setCurrentCamera(nextCameraIndex);

            const newStream = await navigator.mediaDevices.getUserMedia({
                video: videoToggles.video ? { deviceId: cameras[nextCameraIndex].deviceId } : false,
                audio: true,
            });

            setStream(newStream);
        }
    };

    const toggleVideo = () => setVideoToggles({ ...videoToggles, video: !videoToggles.video });
    const toggleAudio = () => setVideoToggles({ ...videoToggles, audio: !videoToggles.audio });
    const resizeVideo = () => setIsFullScreen(!isFullScreen);

    const startScreenShare = async () => {
        try {
            const screen = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setScreenStream(screen);
            setIsScreenSharing(true);
            setIsFullScreen(false);
            // Stop the webcam stream once screen sharing starts
            stream.getTracks().forEach(track => track.stop());
            setStream(screen); // Set the screen stream
        } catch (error) {
            console.error('Error starting screen share:', error);
        }
    };

    const stopScreenShare = () => {
        if (screenStream) {
            screenStream.getTracks().forEach(track => track.stop());
        }
        setIsScreenSharing(false);
        // Revert back to the camera stream
        navigator.mediaDevices.getUserMedia({
            video: { deviceId: cameras[currentCamera]?.deviceId },
            audio: videoToggles.audio,
        }).then(newStream => {
            setStream(newStream);
        });
    };

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const startDrag = (e) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const onDrag = (e) => {
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
            onMouseMove={!isFullScreen ? onDrag : undefined}
            onMouseUp={!isFullScreen ? stopDrag : undefined}
            onMouseLeave={!isFullScreen ? stopDrag : undefined}
            onMouseDown={!isFullScreen ? startDrag : undefined}
            style={!isFullScreen ? {
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: "grab",
            } : {}}
            className={`absolute z-20 bottom-0 right-0 ${isFullScreen ? 'w-full h-full' : 'w-80 h-60'} bg-slate-500 bg-opacity-20 flex items-center justify-center`}>
            {/* Video Containers */}
            <div className="relative w-full h-full flex">
                {/* Large Video */}
                <div className={`flex-1 bg-black ${isCaller ? 'order-2' : 'order-1'} ${isFullScreen ? '' : 'rounded-md'}`}>
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted={!videoToggles.audio}
                        ref={videoElement => {
                            if (videoElement && stream) {
                                videoElement.srcObject = stream;
                            }
                        }}
                        style={{ display: videoToggles.video ? 'block' : 'none' }}
                    ></video>
                </div>

                {/* Small Video */}
                <div
                    className="absolute top-4 left-4 w-32 h-24 bg-black border border-gray-300 rounded-md shadow-md flex items-center justify-center overflow-hidden"
                    style={{ order: isCaller ? 1 : 2 }}
                >
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        style={{ display: videoToggles.video ? 'block' : 'none' }}
                    ></video>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 w-full flex justify-center space-x-4">
                <button
                    className={`p-2 text-white rounded-full ${videoToggles.video ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={toggleVideo}
                >
                    {videoToggles.video ? <VideocamOffOutlined /> : <VideocamOutlined />}
                </button>
                <button
                    className={`p-2 text-white rounded-full ${videoToggles.audio ? 'bg-blue-500' : 'bg-gray-500'}`}
                    onClick={toggleAudio}
                >
                    {videoToggles.audio ? <MicOffOutlined /> : <MicNoneOutlined />}
                </button>
                <button
                    className="p-2 bg-red-500 text-white rounded-full"
                    onClick={() => console.log('Call Ended')}
                >
                    <CallEndOutlined />
                </button>
                <button
                    disabled={isScreenSharing}
                    className="p-2 bg-gray-700 text-white rounded-full"
                    onClick={resizeVideo}
                >
                    <AspectRatioOutlined />
                </button>
                <button
                    className={`p-2 text-white rounded-full ${cameras.length > 1 ? 'bg-purple-500' : 'bg-gray-500'}`}
                    onClick={switchCamera}
                    disabled={cameras.length <= 1}
                >
                    <CameraswitchOutlined />
                </button>
                <button
                    className={`p-2 text-white rounded-full ${isScreenSharing ? 'bg-yellow-500' : 'bg-gray-500'}`}
                    onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                >
                    {isScreenSharing ? <StopScreenShareOutlined /> : <ScreenShareOutlined />}
                </button>
            </div>
        </div>
    );
}








// import { AspectRatioOutlined, CallEndOutlined, CameraswitchOutlined, MicNoneOutlined, MicOffOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
// import React, { useState, useEffect } from 'react';

// export default function OnVideoCall({ isCaller = false }) {
//     const [isFullScreen, setIsFullScreen] = useState(true);
//     const [videoToggles, setVideoToggles] = useState({
//         video: true,
//         audio: true,
//     });
//     const [stream, setStream] = useState(null);
//     const [cameras, setCameras] = useState([]);
//     const [currentCamera, setCurrentCamera] = useState(0);

//     console.log(cameras);


//     useEffect(() => {
//         const getCameras = async () => {
//             try {
//                 if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
//                     const devices = await navigator.mediaDevices.enumerateDevices();
//                     const videoDevices = devices.filter(device => device.kind === 'videoinput');
//                     setCameras(videoDevices);

//                     if (videoDevices.length > 0) {
//                         const stream = await navigator.mediaDevices.getUserMedia({
//                             video: { deviceId: videoDevices[0].deviceId },
//                             audio: videoToggles.audio,
//                         });
//                         setStream(stream);
//                     }

//                 } 
//             } catch (error) {
//                 console.error('Error accessing cameras:', error);
//             }
//         };

//         getCameras();

//         return () => {
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, []);

//     const switchCamera = async () => {
//         if (cameras.length > 1) {
//             const nextCameraIndex = (currentCamera + 1) % cameras.length;
//             setCurrentCamera(nextCameraIndex);

//             const newStream = await navigator.mediaDevices.getUserMedia({
//                 video: videoToggles.video ? { deviceId: cameras[nextCameraIndex].deviceId } : false,
//                 audio: true,
//             });

//             setStream(newStream);
//         }
//     };

//     const toggleVideo = () => setVideoToggles({ ...videoToggles, video: !videoToggles.video });
//     const toggleAudio = () => setVideoToggles({ ...videoToggles, audio: !videoToggles.audio });
//     const resizeVideo = () => setIsFullScreen(!isFullScreen);


//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const [dragging, setDragging] = useState(false);
//     const [offset, setOffset] = useState({ x: 0, y: 0 });

//     const startDrag = (e) => {
//         setDragging(true);
//         setOffset({
//             x: e.clientX - position.x,
//             y: e.clientY - position.y,
//         });
//     };

//     const onDrag = (e) => {
//         if (dragging) {
//             setPosition({
//                 x: e.clientX - offset.x,
//                 y: e.clientY - offset.y,
//             });
//         }
//     };

//     const stopDrag = () => setDragging(false);


//     return (
//         <div
//             onMouseMove={!isFullScreen ? onDrag : undefined}
//             onMouseUp={!isFullScreen ? stopDrag : undefined}
//             onMouseLeave={!isFullScreen ? stopDrag : undefined}
//             onMouseDown={!isFullScreen ? startDrag : undefined}
//             style={!isFullScreen ? {
//                 transform: `translate(${position.x}px, ${position.y}px)`,
//                 cursor: "grab",
//             } : {}}
//             className={`absolute z-20 bottom-0 right-0 ${isFullScreen ? 'w-full h-full' : 'w-80 h-60'} bg-slate-500 bg-opacity-20 flex items-center justify-center`}>
//             {/* Video Containers */}
//             <div className="relative w-full h-full flex">
//                 {/* Large Video */}
//                 <div className={`flex-1 bg-black ${isCaller ? 'order-2' : 'order-1'} ${isFullScreen ? '' : 'rounded-md'}`}>
//                     <video
//                         className="w-full h-full object-cover"
//                         autoPlay
//                         muted={!videoToggles.audio}
//                         ref={videoElement => {
//                             if (videoElement && stream) {
//                                 videoElement.srcObject = stream;
//                             }
//                         }}
//                         style={{ display: videoToggles.video ? 'block' : 'none' }}
//                     ></video>
//                 </div>

//                 {/* Small Video */}
//                 <div
//                     className="absolute top-4 left-4 w-32 h-24 bg-black border border-gray-300 rounded-md shadow-md flex items-center justify-center overflow-hidden"
//                     style={{ order: isCaller ? 1 : 2 }}
//                 >
//                     <video
//                         className="w-full h-full object-cover"
//                         autoPlay
//                         muted
//                         style={{ display: videoToggles.video ? 'block' : 'none' }}
//                     ></video>
//                 </div>
//             </div>

//             {/* Controls */}
//             <div className="absolute bottom-4 w-full flex justify-center space-x-4">
//                 <button
//                     className={`p-2 text-white rounded-full ${videoToggles.video ? 'bg-green-500' : 'bg-red-500'}`}
//                     onClick={toggleVideo}
//                 >
//                     {videoToggles.video ? <VideocamOffOutlined /> : <VideocamOutlined />}
//                 </button>
//                 <button
//                     className={`p-2 text-white rounded-full ${videoToggles.audio ? 'bg-blue-500' : 'bg-gray-500'}`}
//                     onClick={toggleAudio}
//                 >
//                     {videoToggles.audio ? <MicOffOutlined /> : <MicNoneOutlined />}
//                 </button>
//                 {/* <button
//           className="p-2 bg-yellow-500 text-white rounded-full"
//           onClick={() => console.log('Call Cancelled')}
//         >
//           <CallEndOutlined />
//         </button> */}
//                 <button
//                     className="p-2 bg-red-500 text-white rounded-full"
//                     onClick={() => console.log('Call Ended')}
//                 >
//                     <CallEndOutlined />
//                     {/* <FaPhoneAlt /> */}
//                 </button>
//                 <button
//                     className="p-2 bg-gray-700 text-white rounded-full"
//                     onClick={resizeVideo}
//                 >
//                     {/* {isFullScreen ? <FaCompress /> : <FaExpand />} */}
//                     <AspectRatioOutlined />
//                 </button>
//                 <button
//                     className={`p-2 text-white rounded-full ${cameras.length > 1 ? 'bg-purple-500' : 'bg-gray-500'}`}
//                     onClick={switchCamera}
//                     disabled={cameras.length <= 1}
//                 >
//                     <CameraswitchOutlined />
//                 </button>
//             </div>
//         </div>
//     );
// }
