import React from 'react'

export const Audio = React.forwardRef(
    (props,ref) => (    
        <audio 
            id="beep" 
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ref={ref}
        />
    )
)