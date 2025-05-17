import cardClose from "./assets/images/mail_closed.png";
import cardOpened from "./assets/images/mail_opened.png";
import paper from "./assets/images/paper.png";
import gerveraLoading from "./assets/images/gervera.png";
import "./App.css";
import Carrusel from "./components/carrusel";
import { motion } from "framer-motion";
import React from "react";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [currentText, setCurrentText] = React.useState(0);
  const [isOpened, setIsOpened] = React.useState(false);
  const loadingTexts = [
    "Colocando los colores favoritos de perla...",
    "¡Ya casi está listo!...ajustanto todo para que sonria..",
    "¡Ya casi está !........................<3..",
  ];

  React.useEffect(() => {
    const handleLoad = () => setLoading(false);
    setTimeout(handleLoad, 10000);

    return () => window.removeEventListener("load", handleLoad);
  }, []);
  React.useEffect(() => {
    let audio;
    if (isOpened) {
      audio = new Audio(require("../src/audio.mp3"));
      audio.volume = 0.5;
      audio.play();
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isOpened]);
  React.useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [loading]);

  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{
          background: "#ffe4f7",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.img
          src={gerveraLoading}
          alt="Loading..."
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          style={{ width: 90, height: 90 }}
        />
        <motion.p
          key={currentText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{
            color: "#e75480",
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginTop: "20px",
            fontFamily: "Short Stack",
          }}
        >
          {loadingTexts[currentText]}
        </motion.p>
        <motion.img
          src="https://media.giphy.com/media/xT0Gqn72FjAdaI3nFe/giphy.gif?cid=ecf05e47ec0qxik0eeb3xm1mkclwe4mim7idb1senlfh0d4j&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="Loading Animation"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ marginTop: "2rem", width: "350px", height: "350px" }}
        />
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="card-card">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Perla tiene un mensaje del inge (pucha la carta)
          </motion.h1>
          <div className="card-card__content" style={{ position: "relative" }}>
            <motion.img
              src={isOpened ? cardOpened : cardClose}
              className="card-card__image"
              alt=""
              initial={false}
              animate={isOpened ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ duration: 0.7 }}
              style={{ cursor: "pointer", zIndex: 1 }}
              onClick={() => setIsOpened(true)}
            />
            {/* Paper animation */}
            {isOpened && <PaperAnimation />}
          </div>
        </div>
        {/* <Carrusel /> */}
      </div>
    );

    // PaperAnimation component
    function PaperAnimation() {
      const [showPaper, setShowPaper] = React.useState(false);

      React.useEffect(() => {
        // Show paper after 2 minutes (120000 ms) of cardOpened
        const timer = setTimeout(() => setShowPaper(true), 1200);
        return () => clearTimeout(timer);
      }, []);

      // Confetti effect
      const [showConfetti, setShowConfetti] = React.useState(false);
      const [showImage, setShowImage] = React.useState(false);

      // Confetti canvas ref
      const confettiRef = React.useRef(null);

      React.useEffect(() => {
        if (showConfetti && confettiRef.current) {
          import('canvas-confetti').then((confetti) => {
        confetti.create(confettiRef.current, { resize: true })({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
          });
        }
      }, [showConfetti]);

      return (
        <>
          <canvas
        ref={confettiRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
          display: showConfetti ? "block" : "none"
        }}
          />
          <motion.img
        src={paper}
        alt="Carta"
        style={{
          position: "absolute",
          left: "-8%",
          top: "-85%",
          width: "28rem",
          height: "49rem",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
          />
          <motion.div
        style={{
          position: "absolute",
          left: "calc(-8% + 62px)",
          top: "-48%",
          width: "calc(18rem)",
          height: "43rem",
          zIndex: 3,
          pointerEvents: "none",
          background: "transparent",
          padding: "20px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          color: "#5a3d1e",
          fontFamily: "Short Stack, cursive",
          fontSize: "1.4rem",
          whiteSpace: "pre-line",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
          >
        <TypewriterText
          text={`Hello beibi,\n\n Sabés?, es inevitable  no querer besarte, abrazarte, que te apoyes en mi hombro, siento tan bien cuando estas conmigo y he decidido dejar de estar al limite de un casi algo a que seas mi 100% y por eso quiero preguntarte...\n\nPerla Ruby,\n¿Quierés ser mi novia? 💌`}
          speed={40}
        />
          </motion.div>
          <motion.div
        className="buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.7, type: "spring" }}
        style={{
          marginTop: "5rem",
          width: "100%",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
          >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            zIndex: 9,
            fontSize: "1.2rem",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#e75480",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowConfetti(true);
            setShowImage(true);
            setTimeout(() => setShowConfetti(false), 2500);
          }}
        >
          Si
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            zIndex: 9,
            fontSize: "1.2rem",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#aaa",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => alert("descuida flaquis")}
        >
          No
        </motion.button>
          </motion.div>
          {showImage && (
        <motion.img
          src="https://media.giphy.com/media/vUHcwYtCiXBY8FNMiE/giphy.gif?cid=ecf05e474ha3zt9x8dfmqm6xff4rum49yryzx1m4fqx9zxhm&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="Celebration"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{
            position: "absolute",
            left: "50%",
            top: "10%",
            transform: "translateX(-50%)",
            width: "18rem",
            zIndex: 10000,
            pointerEvents: "none",
          }}
        />
          )}
          <motion.img
        src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-beatles-sticker-vector-png-image_11087776.png"
        alt="Floating Paper"
        initial={{ y: 60, x: 0, rotate: 0, opacity: 0 }}
        animate={{
          y: [60, 80, 60],
          x: [0, 20, 0],
          opacity: 1,
          rotate: [0, 8, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        style={{
          position: "absolute",
          left: "56%",
          bottom: "37rem",
          width: "8rem",
          zIndex: 10,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px #e7548055)",
          transform: "translateX(-50%)",
        }}
          />
          <motion.img
        src="https://png.pngtree.com/png-vector/20230815/ourmid/pngtree-rock-and-roll-stickers-vector-png-image_6942489.png"
        alt="Floating Paper"
        initial={{ y: 60, x: 0, rotate: 0, opacity: 0 }}
        animate={{
          y: [60, 80, 60],
          x: [0, 20, 0],
          opacity: 1,
          rotate: [0, 8, 0],
        }}
        // transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-6rem",
          width: "9rem",
          zIndex: 10,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px #e7548055)",
          transform: "translateX(-50%)",
        }}
          />
          <motion.img
        src="https://i.pinimg.com/originals/69/95/39/699539285d0d5ff66131416d0275e739.gif"
        alt="Cute Cat"
        initial={{ y: 60, x: 0, rotate: 0, opacity: 0 }}
        animate={{
          y: [60, 80, 60],
          x: [0, -20, 0],
          opacity: 1,
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        style={{
          position: "absolute",
          left: "16%",
          bottom: "-3rem",
          width: "8rem",
          zIndex: 10,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px #e7548055)",
          transform: "translateX(-50%)",
        }}
          />
        </>
      );
    }
  }
}
function TypewriterText({ text, speed }) {
  const [displayedText, setDisplayedText] = React.useState("");
  React.useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayedText}</span>;
}

export default App;
