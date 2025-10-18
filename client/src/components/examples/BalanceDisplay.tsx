import BalanceDisplay from '../BalanceDisplay';

export default function BalanceDisplayExample() {
  return (
    <div className="p-8 bg-background space-y-4 max-w-md">
      <BalanceDisplay balance={125000} />
      <BalanceDisplay balance={75000} />
    </div>
  );
}
