import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const PolaroidLayout = () => {
  const [images, setImages] = useState({
    img1: 'https://media-public.canva.com/6xr2U/MAEmre6xr2U/1/t.jpg', // Default image 1
    img2: 'https://media-public.canva.com/XMjbc/MAEmrZXMjbc/1/t.jpg', // Default image 2
    img3: 'https://media-public.canva.com/aVsn4/MAEmrXaVsn4/1/t.jpg', // Default image 3
    img4: 'https://template.canva.com/EAFIL7cQNFM/10/0/225w-xczQogg8jK0.jpg',
    img5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6xaGz5XYeWjD-r8Ex8YSgeNmq26lSp86Ug&s"
  });

  const layoutRef1 = useRef(null);  // Ref for the Polaroid layout
  const layoutRef2 = useRef(null);  // Ref for the Torn Paper layout
  const layoutRef3 = useRef(null);
  const inputFileRef1 = useRef(null);
  const inputFileRef2 = useRef(null);
  const inputFileRef3 = useRef(null);
  const inputFileRef4 = useRef(null);
  const inputFileRef5 = useRef(null);


  const handleImageChange = (e, imgKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prevImages) => ({
          ...prevImages,
          [imgKey]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();  // Triggers the file input click
    }
  };

  const handleDownload = (layoutRef, filename) => {
    html2canvas(layoutRef.current, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: null,  // Ensure transparent background is captured if needed
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <div className='flex justify-center flex-col'>
        <div className='flex justify-center mb-10'>
          <div className="app-container ">
            {/* Polaroid Layout */}
            <div className="polaroid-container ml-3 rounded-lg" ref={layoutRef1}>
              <img
                className="background-image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6xaGz5XYeWjD-r8Ex8YSgeNmq26lSp86Ug&s"
                alt="Background"
              />

              {/* Polaroid One */}
              <div className="polaroid polaroid-one" onClick={() => handleImageClick(inputFileRef1)}>
                <img src={images.img1} alt="Polaroid 1" />
                <p className="caption">sweet</p>
                <input
                  type="file"
                  ref={inputFileRef1}
                  style={{ display: 'none' }}  // Hidden input file element
                  onChange={(e) => handleImageChange(e, 'img1')}
                />
              </div>

              {/* Polaroid Two */}
              <div className="polaroid polaroid-two" onClick={() => handleImageClick(inputFileRef2)}>
                <img src={images.img2} alt="Polaroid 2" />
                <p className="caption">memories</p>
                <input
                  type="file"
                  ref={inputFileRef2}
                  style={{ display: 'none' }}  // Hidden input file element
                  onChange={(e) => handleImageChange(e, 'img2')}
                />
              </div>

              {/* Polaroid Three */}
              <div className="polaroid polaroid-three" onClick={() => handleImageClick(inputFileRef3)}>
                <img src={images.img3} alt="Polaroid 3" />
                <p className="caption">2.01.02.022</p>
                <input
                  type="file"
                  ref={inputFileRef3}
                  style={{ display: 'none' }}  // Hidden input file element
                  onChange={(e) => handleImageChange(e, 'img3')}
                />
              </div>
            </div>

            {/* Polaroid Layout Download Button */}
            <button onClick={() => handleDownload(layoutRef1, 'polaroid-layout.png')} className='bg-blue-500 text-white roboto p-2 rounded rounded-md ml-20 mt-2'>
              Download Polaroid Layout
            </button>
          </div>

          {/* Torn Paper Layout */}
          <div>
            <div className="torn-paper-card ml-32" ref={layoutRef2} >
              <div className="image-container " onClick={() => handleImageClick(inputFileRef4)}>
                <img
                  src={images.img4}
                  alt="Torn Paper Image"
                  className="main-image"
                />
                <input
                  type="file"
                  ref={inputFileRef4}
                  style={{ display: 'none' }}  // Hidden input file element
                  onChange={(e) => handleImageChange(e, 'img4')}
                />
              </div>
              <p className="caption"><input type="text" className='bg-transparent' placeholder='Enjoy every moment of your life' /></p>
            </div>

            {/* Torn Paper Layout Download Button */}
            <button onClick={() => handleDownload(layoutRef2, 'torn-paper-layout.png')} className='bg-blue-500 text-white roboto p-2 rounded rounded-md ml-56 mt-2'>
              Download Layout
            </button>
          </div>

          <div className='flex flex-col ml-32'>
            <div className="music-player-container" ref={layoutRef3}>
              {/* Background image (slightly faded) */}
              <div className="background-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6xaGz5XYeWjD-r8Ex8YSgeNmq26lSp86Ug&s"
                  alt="Background"
                />
              </div>

              {/* Main player box */}
              <div className="player h-80 onClick={() => handleImageClick(inputFileRef4)}">
                {/* Album Art */}
                <img
                  className="album-art h-52"
                  src={images.img5}
                  alt="Album Art"
                />
                <input
                  type="file"
                  ref={inputFileRef5}
                  style={{ display: 'none' }}  // Hidden input file element
                  onChange={(e) => handleImageChange(e, 'img5')}
                />
                {/* Song Info */}
                <div className="song-info">
                  <p className="song-title">TRUE LOVE</p>
                  <p className="artist-name">Love Story</p>
                </div>

                {/* Progress bar */}
                <div className="progress-bar mt-2">
                  <span className="current-time"></span>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: '40%' }}></div>
                  </div>
                  <span className="total-time"></span>
                </div>

                {/* Player Controls */}
                <div className="controls">
                  <i className="fa fa-random"></i>
                  <i className="fa fa-step-backward"></i>
                  <i className="fa fa-play-circle"></i>
                  <i className="fa fa-step-forward"></i>
                  <i className="fa fa-repeat"></i>
                </div>

              </div>
            </div>
            <button onClick={() => handleDownload(layoutRef3, 'Music.png')} className='bg-blue-500 text-white roboto p-2 rounded rounded-md ml-20 mr-14 mt-2'>
              Download Layout
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default PolaroidLayout;
