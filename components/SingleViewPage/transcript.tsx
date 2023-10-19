import React, { useEffect, useRef, useState } from 'react'
import { TranscriptSingelViewProps } from '@/types/transcript-singleView'
import { TranscriptData } from '@/types/transcript-data'


const Transcript: React.FC<TranscriptSingelViewProps> = ({ data, videoID, currentVideoTime, currentVidDuration }) => {
  // const Transcript = ({ data }: { data: any }) => {

  const [transcriptionData, setTranscriptionData] = useState<{
    transcript: string;
    words: TranscriptData[];
  }>({ transcript: '', words: [] });
  const transcriptContainerRef = useRef<HTMLDivElement>(null); // Ref for the transcript container

  //to store the videoDuration from videoDetails API endpoint
  const [totalVidDuration, setTotalVidDuration] = useState(0);


  // Fetch transcript data
  useEffect(() => {
    const fetchTranscription = async () => {
      console.log("this is in transcript fetch");
      try {
        const response = await fetch(
          `https://helpmeout.cofucan.tech/srce/api/transcript/${videoID}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
              Vary: 'Origin',
            },
           
            mode: 'cors',
          },
        )
        // const response = await fetch("https://random-words-api.vercel.app/word");
        console.log("response at 40T:", response);
        const data = await response.json();
        console.log(data.word)
        setTranscriptionData(data);
      } catch (error) {
        console.error('Error fetching transcript:', error);
      }
    };
    if (videoID) {
      fetchTranscription();
    }
  }, [videoID]);

    //fetch the videoDuration from videoDetails API
    useEffect(() => {
      const fetchVideoFromNewAPI = async () => {
        console.log("this is in videoDetails fetch");
        try {
          const response = await fetch(`https://helpmeout.cofucan.tech/srce/api/recording/${videoID}`);
          // const response = await fetch("https://random-words-api.vercel.app/word");
          // console.log("response at 30VD in Transcript:", response);
          const data = await response.json();
          console.log("data in VD at 76:", data);
          setTotalVidDuration(data.video_length);
        } catch (error) {
          console.error('Error fetching videoDetails in Transcript:', error);
        }
      };
      if (videoID) {
        fetchVideoFromNewAPI();
      }
    }, [videoID]);

  // to format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  //to show current word
  useEffect(() => {
    const transcriptContainer = transcriptContainerRef.current as HTMLElement;
    // transcriptContainer.style.backgroundColor = 'blue';
    if (transcriptContainer) {
      const currentTranscript = transcriptionData.words?.find((item) => item.start <= currentVideoTime && item.end >= currentVideoTime);
      if (currentTranscript) {
        const transcriptElement = document.getElementById(`transcript-${currentTranscript.start}`) as HTMLElement;
        transcriptElement.style.color = '#000';
        if (transcriptElement) {
          transcriptContainer.scrollTo({
            top: transcriptElement.offsetTop - transcriptContainer.offsetTop - 50,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [currentVideoTime, transcriptionData]);

  useEffect(() => {
    // Making sure videoDuration is greater than 0 to avoid division by zero
    if (totalVidDuration > 0 && currentVideoTime > 0) {
      // console.log("curentVidDur:", totalVidDuration, " & currVidTime:", currentVideoTime);
      // Calculate the progress percentage
      const progress = (currentVideoTime / totalVidDuration) * 100 ;
      console.log("Progresses:", progress);
      // Scroll your transcript container here
      const transcriptContainer = document.getElementById('org-transcipt-container');
      if (transcriptContainer) {
        transcriptContainer.scrollTop = (progress / 100) * transcriptContainer.scrollHeight * 0.9;  //adjust the scroll speed
      }
    }
  }, [totalVidDuration, currentVideoTime]);


  // set interval to show the transcript in different div with interval of 'intervalDuration'
  const intervalDuration = 6; // 6 seconds
  const duration = totalVidDuration;
  const intervals = [];
  for (let i = 0; i < duration; i += intervalDuration) {
    intervals.push(i);
  }

  return (
    <div className="mt-5 mb-5">
      <h3 className="font-Work-Sans text-[20px] font-[500] ">Transcript</h3>
      <div className="my-4">
        {/* language options */}
        <select
          className="py-2 px-5 pr-10 border-[1px] font-Work-Sans text-gray-400 rounded-lg border-gray-200 min-w-[140px] bg-right-10"
          defaultValue="English"
          name="languages"
          id="languages"
        >
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
        </select>
      </div>
      {/* this maps the transcript array recieved from the backend */}
      <div className="h-[360px] overflow-y-scroll custom-scrollbar md:pr-[80px] mt-10 font-Work-Sans p-2 pt-10" id='org-transcipt-container'>
        {/* {data?.map((el: any, i: number) => {
          const lastItem = data.length - 1
          return (
            <div
              key={el.id}
              className={`flex mb-10 justify-start items-start ${i === lastItem ? 'opacity-25' : 'opacity-100'
                } md:gap-10 gap-5`}
            >
              <p className="text-black font-semibold">{el.time}</p>
              <div>
                <p className="text-gray-900 md:text-[18px] sm:text-[14px] font-normal">
                  {el.msg}
                </p>
              </div>
            </div>
          )
        })} */}
        {intervals.map((startTime, index) => {
          const endTime = startTime + intervalDuration;
          const wordsInInterval = transcriptionData.words.filter(item => item.start >= startTime && item.start < endTime);

          return (
            <div key={index} className='flex'>
              <h5 className="font-[400] w-1/12  font-Work-Sans text-[14px] xs:text-[16px] text-black  py-2 mr-3 xs:w-2/12 ">
                {formatTime(startTime)}
              </h5>
              <div className="w-11/12 flex flex-wrap py-2 xs:w-10/12">
                {wordsInInterval.map((item, wordIndex) => (
                  //mapping with key 'wordIndex'
                  <div key={wordIndex} id="transcript-container" ref={transcriptContainerRef} className="custom-scrollbar  overflow-x-auto flex flex-wrap" >
                    <p id={`transcript-${item.start}`} className="mr-1 text-gray-400">
                      <strong>{item.punctuated_word}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Transcript
