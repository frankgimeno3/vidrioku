import { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setVideoUrl("https://vidrioku.s3.eu-west-3.amazonaws.com/videos/HeroVideoVidrioku.mp4");
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 object-cover h-screen w-screen bg-sky-900 overflow-hidden"
        src={videoUrl}
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute w-full flex flex-col justify-center items-center text-center mt-24 pt-24">
        <div className="bg-blue-500 bg-opacity-50 backdrop-filter backdrop-blur-lg w-full mt-24 py-10">
          <h1 className="text-4xl md:text-6xl text-sky-50 font-bold">
            VIDRIOKU
          </h1>
          <p className="xl:text-2xl text-slate-200 max-w-[45vw] sm:max-w-[60vw] m-auto pt-3 font-light sm:text-xs md:text-xs">
            Conectamos empresas del sector del vidrio con personal técnico especializado.
          </p>
          <p className="xl:text-xl text-slate-200 max-w-[45vw] sm:max-w-[50vw] m-auto pt-1 font-medium sm:text-xs md:text-xs">
            Únase a nosotros para encontrar talento o empleo desde hoy mismo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
