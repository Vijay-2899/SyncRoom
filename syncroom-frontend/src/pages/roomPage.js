import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { io } from 'socket.io-client';
import { PageWrapper, Card, Button, Title } from '../components/StyledContainer';

const socket = io('http://localhost:3000');

function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [queue, setQueue] = useState([]);
  const audioRefs = useRef({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchRoomData = async () => {
      try {
        const [roomRes, queueRes] = await Promise.all([
          axios.get(`/rooms/${roomId}`, config),
          axios.get(`/rooms/${roomId}/queue`, config)
        ]);
        setRoom(roomRes.data);
        setQueue(queueRes.data.queue);
      } catch {
        console.error('Failed to fetch room or queue.');
      }
    };

    fetchRoomData();

    socket.emit('joinRoom', roomId);

    socket.on('play', () => {
      const currentAudio = audioRefs.current[roomId];
      if (currentAudio) currentAudio.play();
    });

    socket.on('pause', () => {
      const currentAudio = audioRefs.current[roomId];
      if (currentAudio) currentAudio.pause();
    });

    return () => {
      socket.off('play');
      socket.off('pause');
    };
  }, [roomId]);

  const handlePlay = () => {
    socket.emit('play', roomId);
    const audio = audioRefs.current[roomId];
    if (audio) audio.play();
  };

  const handlePause = () => {
    socket.emit('pause', roomId);
    const audio = audioRefs.current[roomId];
    if (audio) audio.pause();
  };

  return (
    <PageWrapper>
      <Card style={{ width: '100%', maxWidth: '800px' }}>
        {room ? (
          <>
            <Title>{room.name}</Title>
            <p><strong>Room Code:</strong> {room.room_code}</p>

            <Button style={{ margin: '10px 0' }} onClick={() => navigate(`/room/${roomId}/upload`)}>
              Upload Song
            </Button>

            <h3 style={{ marginTop: '1rem' }}>Playlist</h3>
            {queue.length === 0 ? (
              <p>No songs in the queue yet.</p>
            ) : (
              queue.map((song) => (
                <div key={song.id} style={{ marginBottom: '1rem' }}>
                  <strong>{song.title}</strong> by {song.artist}<br />
                  <audio
                    controls
                    ref={(el) => (audioRefs.current[roomId] = el)}
                    src={`http://localhost:3000/${song.file_path}`}
                  />
                  <div style={{ marginTop: '5px' }}>
                    <Button onClick={() => handlePlay(song.id)}>Play</Button>
                    <Button onClick={handlePause} style={{ marginLeft: '10px' }}>Pause</Button>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <p>Loading room details...</p>
        )}
      </Card>
    </PageWrapper>
  );
}

export default RoomPage;
