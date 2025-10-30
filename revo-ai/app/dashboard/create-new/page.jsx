"use client"
import axios from 'axios'; 
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

const scriptData="A young woman, ANNA (20s), is alone in a dark, tense kitchen at night. She is urgently whispering into her phone, asking someone to stop a joke and come inside. The camera holds on her as she types a frantic text. Suddenly, a soft, dry SCRAPING SOUND is heard coming from the window behind her. She jumps, dropping the phone, her eyes wide with fear. She slowly retrieves the phone. CLOSE UP on the screen reveals a newly received text message: 'I'm not outside'. Immediately, a sickening WET DRAGGING SOUND and a low, heavy BREATH are heard from the door leading to the dark basement stairs. Anna begins to back away. The camera focuses intensely on the doorknob, which slowly and deliberately begins to turn inwards, accompanied by a final, terrifying musical sting."

function CreateNew() {

  const [formData, setFormData] = useState([]);
  const [loading,setLoading]=useState(false);
  const [videoScript, setVideoScript]=useState();

  const onHandleInputChange = (fieldName, fieldValue) =>{
    setFormData(prev =>({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  const onCreateClickHandler=()=>{
    // getVideoScript();
    // GenerateAudioFile(scriptData);
    console.log('Done')
  }

  //Get video Script

  const getVideoScript =async()=>{
    setLoading(true)
    const prompt = 'Write a script to generate '+ formData.duration+' video on topic : '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentTextas field'
    // console.log(prompt)
    const result = await axios.post('/api/get-video-script',{
      prompt: prompt
    }).then(resp=>{
      // console.log(resp.data.result);
      setVideoScript(resp.data.result);
      // GenerateAudioFile(resp.data.result);
    })
    setLoading(false);
  }

 // TO generate Audio (add voice to videos)
const GenerateAudioFile = async(videoScriptData)=>{
  setLoading(true);
  let script = '';
  const id = uuidv4();
  
  // videoScriptData.forEach(item=>{
  //   if (item && item.contentText) {
  //     script = script + item.contentText + ' ';
  //   }
  // });
  try{
    console.log('Full Audio Script:', script);
    await axios.post('/api/generate-audio',{
      text: videoScriptData,
      id:id
    }).then(resp=>{
      console.log(resp.data);
    })
  }catch(e){
    console.log("ERROR: ",e)
  }
  setLoading(false);
}


  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New Shorts</h2>

      <div className='mt-10 shadow-md p-10 rounded-xl'>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange}/>
        {/* Create Button  */}
        <div className="flex justify-center w-full">
          <Button className="mt-10 px-10 py-4 text-lg font-bold 
                            bg-primary hover:bg-primary/90 
                            text-white rounded-full shadow-2xl 
                            shadow-primary/50 transition-all duration-200 
                            hover:scale-[1.02] active:scale-[0.98] 
                            focus:outline-none focus:ring-4 focus:ring-primary/50"
                            onClick={onCreateClickHandler}>
              Create
          </Button>
      </div>
      <CustomLoading loading={loading}/>
      </div>
    </div>
  )
}

export default CreateNew
