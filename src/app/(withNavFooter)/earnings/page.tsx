import EarningBarChart from '@/components/WithNavFooterComponents/EarningsComponents/EarningBarChart';
import PieChartComponents from '@/components/WithNavFooterComponents/EarningsComponents/PieChartComponents';
import TransectionTable from '@/components/WithNavFooterComponents/EarningsComponents/TransectionTable';

const EarningsPage = () => {
  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold">Earnings</h1>
        <p className="text-secondary mb-8">
          Understand how your profile is performing and track your growth.
        </p>
        <div className="flex justify-center items-center gap-5">
          <button className="bg-primary text-white py-3 px-5 rounded-lg">
            Add Income/Expense
          </button>
          <button className="border border-primary  py-3 px-5 rounded-lg">
            Download CSV
          </button>
        </div>
      </div>

      <div className="my-10 w-full flex justify-center items-center gap-5">
        <div className="md:w-[40%] p-5 border rounded-lg ">
          <PieChartComponents />
        </div>
        <div className="md:w-[60%] p-5  border rounded-lg ">
          <EarningBarChart />
        </div>
      </div>
      <div className="md:mt-20">
        <TransectionTable />
      </div>
    </div>
  );
};

export default EarningsPage;
