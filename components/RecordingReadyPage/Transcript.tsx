/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react';

import { TranscriptProps } from '@/types/transcript'
import { TranscriptData } from '@/types/transcript-data'

// interface TranscriptData {
//   start: number;
//   end: number;
//   punctuated_word: string;
// }

const Transcript: React.FC<TranscriptProps> = ({ videoID, currentVideoTime }) => {
  const [transcriptionData, setTranscriptionData] = useState<{
    transcript: string;
    words: TranscriptData[];
  }>({ transcript: '', words: [] });
  const transcriptContainerRef = useRef<HTMLDivElement>(null); // Ref for the transcript container


  // Fetch transcript data
  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const response = await fetch(`https://www.cofucan.tech/srce/api/transcript/${videoID}.json`);
        const data = await response.json();
        console.log(data.transcript)
        setTranscriptionData(data);
      } catch (error) {
        console.error('Error fetching transcript:', error);
      }
    };
    if (videoID) {
      fetchTranscription();
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
      const currentTranscript = transcriptionData.words.find((item) => item.start <= currentVideoTime && item.end >= currentVideoTime);
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



  return (
    <div className='w-full'>
      <h5 className="text-h6 ss:text-h5 text-black font-Sora font-[600] mb-4">
        Transcript
      </h5>
      <div className="mb-[40px] gap-[80px] border-[1px] px-[8px] w-[170px] h-[35px] items-center rounded-[4px] hidden ss:flex">
        <h6 className="text-h6 text-gray-300">English</h6>
        <Image
          src="/assets/video-repo/arrow-down.svg"
          alt="arrow down"
          width="16"
          height="16"
        />
      </div>
      <div className="w-full h-auto relative">
        <div className="font-Inter h-[164px] border-[1px] rounded-[12px]  ss:border-none p-3 ss:h-[255px]   gap-4 relative">
          <div className='p-2 overflow-y-scroll custom-scrollbar flex flex-col h-full'>
            <div className="flex gap-4">
              <h5 className="font-[400] font-Work-Sans text-[14px] xs:text-[16px] text-black">
                {formatTime(currentVideoTime)}
              </h5>
              <div
                id="transcript-container"
                ref={transcriptContainerRef}
                className=" w-11/12 max-w-lg ss:max-w-5xl overflow-x-auto flex flex-wrap"
              >
                {transcriptionData.words.map((item, index) => {
                  return (
                    <p key={index} id={`transcript-${item.start}`} className="mr-1 text-gray-400">
                      <strong>{item.punctuated_word}</strong>
                    </p>
                  );
                })}

                {/* {Array.from({ length: numIntervals }, (_, i) => renderInterval(i))} */}

                {/* {intervals.map((startTime, index) => {
                  const endTime = startTime + intervalDuration;
                  const wordsInInterval = transcriptionData.words.filter(item => item.start >= startTime && item.start < endTime);

                  return (
                    <div key={index}>
                      <p>Interval {index + 1}: {startTime}s - {endTime}s</p>
                      {wordsInInterval.map((item, wordIndex) => (
                        <p key={wordIndex} id={`transcript-${item.start}`} className="mr-1">
                          <strong>{item.punctuated_word}</strong>
                        </p>
                      ))}
                    </div>
                  );
                })} */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transcript
