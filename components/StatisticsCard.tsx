function StatisticsCard({
  title,
  value,
}: {
  title: string;
  value: string | number | undefined;
}) {
  return (
    <div className="p-5 rounded-md bg-secondary text-center text-2xl">
      <h3 className="uppercase text-base text-white">
        {title} 
        : <span>{value}</span>.
      </h3>
    </div>
  );
}

export default StatisticsCard;
