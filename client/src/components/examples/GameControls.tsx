import GameControls from '../GameControls';

export default function GameControlsExample() {
  return (
    <div className="p-8 bg-background max-w-md">
      <GameControls
        onHit={() => console.log('Hit')}
        onStand={() => console.log('Stand')}
        onDouble={() => console.log('Double')}
        onSplit={() => console.log('Split')}
        canDouble={true}
        canSplit={true}
      />
    </div>
  );
}
