import { useState, useEffect } from "react";
import "./styles.css";

type EmotionFlavor =
  | "numb"
  | "angry"
  | "sad"
  | "hopeful"
  | "longing"
  | "joyful"
  | "relieved"
  | "grateful";

type Emotion = {
  id: string;
  text: string;
  timestamp: string;
  x: number;
  y: number;
  gradient: string;
  animation: string;
  tag: string;
  flavor: EmotionFlavor;
  replies: string[];
};

const flavorStyles: Record<
  EmotionFlavor,
  { gradient: string; animation: string; tag: string }
> = {
  numb: {
    gradient: "linear-gradient(135deg, #6b5e5e, #a89c9c)",
    animation: "fadeFloat",
    tag: "quiet",
  },
  angry: {
    gradient: "linear-gradient(135deg, #b00020, #ff5e5e)",
    animation: "pulseShake",
    tag: "burning",
  },
  sad: {
    gradient: "linear-gradient(135deg, #661f3d, #943f5f)",
    animation: "drift",
    tag: "drift",
  },
  hopeful: {
    gradient: "linear-gradient(135deg, #db6a7b, #ffc2bc)",
    animation: "floatBounce",
    tag: "rising",
  },
  longing: {
    gradient: "linear-gradient(135deg, #884f5f, #d49ea0)",
    animation: "floatAway",
    tag: "missing",
  },
  joyful: {
    gradient: "linear-gradient(135deg, #fcb69f, #ffdde1)",
    animation: "bounceFloat",
    tag: "light",
  },
  relieved: {
    gradient: "linear-gradient(135deg, #a58da5, #ffe8f0)",
    animation: "slowLift",
    tag: "ease",
  },
  grateful: {
    gradient: "linear-gradient(135deg, #c97c7c, #f5d7d7)",
    animation: "glowFloat",
    tag: "thankful",
  },
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [text, setText] = useState("");
  const [flavor, setFlavor] = useState<EmotionFlavor>("sad");
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setEmotions((prev) =>
        prev.map((emo) => ({
          ...emo,
          x: (emo.x + Math.random() * 6 - 3 + 100) % 100,
          y: (emo.y + Math.random() * 6 - 3 + 100) % 100,
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const style = flavorStyles[flavor];
    const newEmotion: Emotion = {
      id: Date.now().toString(),
      text: text.trim().toLowerCase(),
      timestamp: new Date().toLocaleString(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      gradient: style.gradient,
      animation: style.animation,
      tag: style.tag,
      flavor,
      replies: [],
    };
    setEmotions((prev) => [...prev, newEmotion]);
    setText("");
  };

  const handleReply = (id: string) => {
    setReplyId(id);
  };

  const submitReply = () => {
    if (!replyText.trim()) return;
    setEmotions((prev) =>
      prev.map((emo) =>
        emo.id === replyId
          ? {
              ...emo,
              replies: [...emo.replies, replyText.trim().toLowerCase()],
            }
          : emo
      )
    );
    setReplyText("");
    setReplyId(null);
  };

  if (showSplash) {
    return (
      <div className="splash-screen">
        <h1>this space is for you</h1>
        <p>to leave a trace of what you're feeling.</p>
        <p>when you're ready, enter.</p>
        <button onClick={() => setShowSplash(false)}>enter</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>meltdown</h1>
      <form onSubmit={handleSubmit} className="emotion-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="type your meltdown moment..."
        />
        <div className="flavor-picker">
          {Object.keys(flavorStyles).map((f) => (
            <button
              key={f}
              type="button"
              className={`flavor-btn ${flavor === f ? "selected" : ""}`}
              onClick={() => setFlavor(f as EmotionFlavor)}
            >
              {f}
            </button>
          ))}
        </div>
        <button type="submit">log it</button>
      </form>

      <div className="emotion-canvas">
        {emotions.map((emo) => (
          <div
            key={emo.id}
            className={`emotion-orb ${emo.animation}`}
            style={{
              top: `${emo.y}%`,
              left: `${emo.x}%`,
              background: emo.gradient,
            }}
            title={emo.timestamp}
            onClick={() => handleReply(emo.id)}
          >
            <div className="orb-text">{emo.text}</div>
            <div className="orb-tag">{emo.tag}</div>
            {emo.replies.length > 0 && (
              <div className="replies">
                {emo.replies.map((rep, i) => (
                  <div key={i} className="reply">
                    ↳ {rep}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {replyId && (
        <div className="reply-box">
          <textarea
            placeholder="type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={submitReply}>reply</button>
        </div>
      )}
    </div>
  );
}
