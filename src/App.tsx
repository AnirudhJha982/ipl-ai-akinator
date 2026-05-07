import { useEffect, useState } from "react";
import { loadPlayers } from "./data/loadPlayers";

function App() {

  const [filteredPlayers, setFilteredPlayers] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [guess, setGuess] = useState("");

  useEffect(() => {

    loadPlayers().then((data) => {

      setFilteredPlayers(data);

      setQuestion("Is the player Indian?");
    });

  }, []);

  const handleAnswer = (answer: string) => {

    let updated = filteredPlayers;

    if (question === "Is the player Indian?") {

      if (answer === "yes") {

        updated = filteredPlayers.filter(
          (p: any) => p.Country === "India"
        );

      } else {

        updated = filteredPlayers.filter(
          (p: any) => p.Country !== "India"
        );
      }

      setQuestion("Is the player left handed?");
    }

    else if (question === "Is the player left handed?") {

      if (answer === "yes") {

        updated = filteredPlayers.filter(
          (p: any) => p.Batting_Hand === "Left_Hand"
        );

      } else {

        updated = filteredPlayers.filter(
          (p: any) => p.Batting_Hand !== "Left_Hand"
        );
      }

      setQuestion("Is the player a fast bowler?");
    }

    else if (question === "Is the player a fast bowler?") {

      if (answer === "yes") {

        updated = filteredPlayers.filter(
          (p: any) =>
            p.Bowling_Skill?.toLowerCase().includes("fast") ||
            p.Bowling_Skill?.toLowerCase().includes("medium")
        );

      } else {

        updated = filteredPlayers.filter(
          (p: any) =>
            !p.Bowling_Skill?.toLowerCase().includes("fast") &&
            !p.Bowling_Skill?.toLowerCase().includes("medium")
        );
      }

      setQuestion("Is the player a spinner?");
    }

    else if (question === "Is the player a spinner?") {

      if (answer === "yes") {

        updated = filteredPlayers.filter(
          (p: any) =>
            p.Bowling_Skill?.toLowerCase().includes("spin") ||
            p.Bowling_Skill?.toLowerCase().includes("break")
        );

      } else {

        updated = filteredPlayers.filter(
          (p: any) =>
            !p.Bowling_Skill?.toLowerCase().includes("spin") &&
            !p.Bowling_Skill?.toLowerCase().includes("break")
        );
      }

      setQuestion("Has the player played international cricket?");
    }

    else if (question === "Has the player played international cricket?") {

      setQuestion("Has the player played for RCB?");
    }

    else if (question === "Has the player played for RCB?") {

      setQuestion("Is the player currently active?");
    }

    setFilteredPlayers(updated);

    const next = questionCount + 1;

    setQuestionCount(next);

    if (updated.length <= 1 || next >= 8) {

      setGuess(
        updated[0]?.Player_Name ||
        "Unknown Player"
      );

      return;
    }
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/stadium.jpg')"
      }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#000814]/70"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">

        <h1 className="text-7xl md:text-8xl font-black tracking-wide">

          <span className="text-white">
            IPL
          </span>

          <span className="text-yellow-400 ml-3">
            AI
          </span>

        </h1>

        <p className="text-cyan-200 text-2xl tracking-[10px] uppercase mt-3">
          Agentic Akinator
        </p>

      </div>

      {/* Main Card */}
      <div className="relative z-10 w-[92%] max-w-5xl bg-[#02152d]/90 border border-cyan-400/30 rounded-[40px] p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,180,255,0.4)]">

        {!guess ? (

          <>

            {/* Top Section */}
            <div className="flex justify-between items-center mb-8">

              {/* Question Count */}
              <div className="bg-[#051b38] border border-cyan-400/20 rounded-3xl px-8 py-5 flex items-center gap-4">

                <div className="text-4xl">
                  💬
                </div>

                <div>

                  <p className="text-slate-300 text-lg">
                    Question
                  </p>

                  <h2 className="text-white text-4xl font-black">

                    {questionCount + 1} / 8

                  </h2>

                </div>

              </div>

              {/* Helmet */}
              <div className="w-28 h-28 rounded-full border-4 border-cyan-400 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(0,255,255,0.8)]">

                🏏

              </div>

              {/* Remaining */}
              <div className="bg-[#051b38] border border-green-400/20 rounded-3xl px-8 py-5 text-right">

                <p className="text-slate-300 text-lg">
                  Remaining Players
                </p>

                <h2 className="text-green-400 text-4xl font-black">

                  {filteredPlayers.length}

                </h2>

              </div>

            </div>

            {/* Progress */}
            <div className="w-full h-5 bg-[#010d1f] rounded-full overflow-hidden border border-cyan-500/20 mb-10">

              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 shadow-[0_0_25px_rgba(0,255,255,0.9)]"
                style={{
                  width: `${((questionCount + 1) / 8) * 100}%`
                }}
              ></div>

            </div>

            {/* Question Card */}
            <div className="bg-[#031a35]/95 border border-cyan-400/20 rounded-[35px] p-14 text-center mb-12 relative overflow-hidden shadow-[0_0_40px_rgba(0,180,255,0.2)]">

              <div className="absolute right-10 bottom-5 text-[180px] opacity-5">
                🏏
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white relative z-10">

                {question}

              </h2>

            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* YES */}
              <button
                onClick={() => handleAnswer("yes")}
                className="bg-gradient-to-b from-green-400 to-green-600 py-6 rounded-[30px] text-4xl font-black text-white hover:scale-105 transition-all duration-200 shadow-[0_0_25px_rgba(0,255,100,0.6)]"
              >
                ✅ Yes
              </button>

              {/* NO */}
              <button
                onClick={() => handleAnswer("no")}
                className="bg-gradient-to-b from-red-400 to-red-600 py-6 rounded-[30px] text-4xl font-black text-white hover:scale-105 transition-all duration-200 shadow-[0_0_25px_rgba(255,0,0,0.6)]"
              >
                ❌ No
              </button>

              {/* MAYBE */}
              <button
                onClick={() => handleAnswer("maybe")}
                className="bg-gradient-to-b from-yellow-300 to-yellow-500 py-6 rounded-[30px] text-4xl font-black text-black hover:scale-105 transition-all duration-200 shadow-[0_0_25px_rgba(255,230,0,0.6)]"
              >
                ❓ Maybe
              </button>

            </div>

          </>

        ) : (

          <div className="text-center py-10">

            <h2 className="text-5xl font-black text-white mb-8">
              My Prediction
            </h2>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[40px] p-14 shadow-[0_0_40px_rgba(0,200,255,0.6)]">

              <h1 className="text-6xl md:text-7xl font-black text-white">

                {guess}

              </h1>

            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-10 bg-white text-black px-12 py-5 rounded-3xl text-2xl font-black hover:scale-105 transition-all duration-200"
            >
              🔄 Play Again
            </button>

          </div>

        )}

      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-8 w-[92%] max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-[#02152d]/90 border border-yellow-400/20 rounded-3xl p-6 backdrop-blur-xl">

          <h3 className="text-yellow-400 text-3xl font-black">
            🏆 Play Smart
          </h3>

          <p className="text-white text-lg mt-2">
            Think Cricket. Beat AI.
          </p>

        </div>

        <button className="bg-[#02152d]/90 border border-cyan-400/20 rounded-3xl p-6 text-white text-3xl font-black hover:scale-105 transition-all duration-200">

          📊 Stats

        </button>

        <button
          onClick={() => window.location.reload()}
          className="bg-[#02152d]/90 border border-cyan-400/20 rounded-3xl p-6 text-white text-3xl font-black hover:scale-105 transition-all duration-200"
        >

          🔄 New Game

        </button>

      </div>

    </div>
  );
}

export default App;