import React from 'react'
import NewYearEventHero from '../components/Events/EventHero'
import DanceCrew from '../components/Events/DanceCrew'

function Event() {
  useEffect(() => {
    document.title = "CULT NIGHTS Season 1 | South Cult";
  }, []);
  
  return (
    <div>
      <NewYearEventHero />
      <DanceCrew />
    </div>
  )
}

export default Event