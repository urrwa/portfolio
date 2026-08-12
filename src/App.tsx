/**
 * © 2026 Urwah Imtiaz. All rights reserved.
 * Not licensed for reuse or redistribution.
 */

import { useState } from 'react';
import { AudioEngineProvider } from './components/AudioEngine';
import HandDrawnFilters from './components/HandDrawnFilters';
import CustomCursor from './components/CustomCursor';
import OpeningAnimation from './components/OpeningAnimation';
import SceneOutside from './components/SceneOutside';
import RoomWorkspace from './components/RoomWorkspace';
import RoomAbout from './components/RoomAbout';
import RoomProjects from './components/RoomProjects';
import RoomSkills from './components/RoomSkills';
import RoomPlayground from './components/RoomPlayground';
import RoomExperience from './components/RoomExperience';
import RoomContact from './components/RoomContact';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState<
    'opening' | 'outside' | 'workspace' | 'about' | 'projects' | 'skills' | 'playground' | 'experience' | 'contact'
  >('opening');

  return (
    <AudioEngineProvider>
      <div className="relative w-full min-h-screen bg-[#F9F8F6] text-neutral-800 antialiased overflow-hidden select-none">
        {/* Global Hand-Drawn filters and textures */}
        <HandDrawnFilters />
        
        {/* Customized carbon graphite cursor */}
        <CustomCursor />

        {/* Scene One: Outside House */}
        <AnimatePresence mode="popLayout">
          {(currentLocation === 'opening' || currentLocation === 'outside') && (
            <motion.div
              key="outside"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                filter: 'blur(8px)',
                transition: { duration: 1.4, ease: 'easeInOut' }
              }}
              className="absolute inset-0 w-full min-h-screen z-20"
            >
              <SceneOutside onEnterHouse={() => setCurrentLocation('workspace')} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Opening Animation scene */}
        {currentLocation === 'opening' && (
          <OpeningAnimation onComplete={() => setCurrentLocation('outside')} />
        )}

        {/* Scene Two: Central Workspace Hub */}
        {currentLocation === 'workspace' && (
          <motion.div
            initial={{ scale: 1.25, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="w-full min-h-screen z-10"
          >
            <RoomWorkspace onNavigate={(room) => setCurrentLocation(room)} />
          </motion.div>
        )}

        {/* Interactive Rooms */}
        {currentLocation === 'about' && (
          <div className="animate-in fade-in duration-700 slide-in-from-right-10">
            <RoomAbout onBack={() => setCurrentLocation('workspace')} />
          </div>
        )}

        {/* Projects Art Exhibition Room */}
        {currentLocation === 'projects' && (
          <div className="animate-in fade-in duration-700 slide-in-from-right-10">
            <RoomProjects onBack={() => setCurrentLocation('workspace')} />
          </div>
        )}

        {/* AI & Frontend Skills Laboratory */}
        {currentLocation === 'skills' && (
          <div className="animate-in fade-in duration-700 slide-in-from-right-10">
            <RoomSkills onBack={() => setCurrentLocation('workspace')} />
          </div>
        )}

        {/* Interactive AI Sandbox Playground */}
        {currentLocation === 'playground' && (
          <div className="animate-in fade-in duration-700 slide-in-from-right-10">
            <RoomPlayground onBack={() => setCurrentLocation('workspace')} />
          </div>
        )}

        {/* Chronological Floating Timeline */}
        {currentLocation === 'experience' && (
          <div className="animate-in fade-in duration-700 slide-in-from-right-10">
            <RoomExperience onBack={() => setCurrentLocation('workspace')} />
          </div>
        )}

        {/* Cozy Message Cafe */}
        {currentLocation === 'contact' && (
          <div className="animate-in fade-in duration-700 slide-in-from-right-10">
            <RoomContact onBack={() => setCurrentLocation('workspace')} />
          </div>
        )}
      </div>
    </AudioEngineProvider>
  );
}
