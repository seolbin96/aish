import React, { useState, useEffect } from 'react';
import './map.css';
import button from './button.png';

const { kakao } = window;

const Map = ({ onChatInputChange }) => {
    const [chatInput, setChatInput] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [map, setMap] = useState(null); // Kakao Map 인스턴스 저장
    const [customOverlay, setCustomOverlay] = useState(null); // 오버레이 저장

    useEffect(() => {
        const container = document.getElementById('kamap');
        const options = {
            center: new kakao.maps.LatLng(35.1797, 126.9064),
            level: 3
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, []);

    const handleChatInputChange = (e) => {
        setChatInput(e.target.value);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    const handleDisplayOverlay = () => {
        const latitudeValue = parseFloat(latitude);
        const longitudeValue = parseFloat(longitude);

        if (!isNaN(latitudeValue) && !isNaN(longitudeValue) && map) {
            const position = new kakao.maps.LatLng(latitudeValue, longitudeValue);
            map.panTo(position);

            const content = '<div class="overlaybox">추천 여행지</div>';

            if (customOverlay) {
                customOverlay.setMap(null); // 기존 오버레이 삭제
            }

            const newCustomOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content,
                xAnchor: 0.5,
                yAnchor: 0.5
            });

            newCustomOverlay.setMap(map); // 새 오버레이 표시
            setCustomOverlay(newCustomOverlay); // 오버레이 업데이트
        }
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleChatSubmit();
        }
    };

    const handleChatSubmit = () => {
        onChatInputChange(chatInput);
        setChatInput('');
    };

    return (
        <div className="Map">
            <div id="kamap" style={{ width: '1100px', height: '762px' }}></div>
            <div className="input-container">
                <input
                    id="latitude"
                    type="text"
                    placeholder="위도"
                    value={latitude}
                    onChange={handleLatitudeChange}
                />
                <input
                    id="longitude"
                    type="text"
                    placeholder="경도"
                    value={longitude}
                    onChange={handleLongitudeChange}
                />
                <button onClick={handleDisplayOverlay}>위치 표시</button>
            </div>
            <div className="chat-container">
                <input
                    id="tour"
                    type="text"
                    placeholder='"여행지 추천해줘" 라고 말해보세요!'
                    value={chatInput}
                    onChange={handleChatInputChange}
                    onKeyDown={handleInputKeyPress}
                />
                <button id='et' onClick={handleChatSubmit}><img src={button} alt="button" /></button>
            </div>
        </div>
    );
};

export default Map;
