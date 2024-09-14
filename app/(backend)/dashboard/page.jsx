import DashboardTable from "@/components/backend/DashboardTable";
import Heading from "@/components/backend/Heading";
import LargeCardsOrders from "@/components/backend/LargeCardsOrders";
import LargeCardsSales from "@/components/backend/LargeCardsSales";
import MediumCards from "@/components/backend/MediumCards";
import SalesLineChart from "@/components/backend/SalesLineChart";
import SalesPieCart from "@/components/backend/SalesPieCart";
import Space16 from "@/components/backend/Space16";
import jsonData from "../../../MOCK_DATA.json";


const columns = ["ID", "First_Name", "Last_Name", 'Email', 'Gender', 'IP Address'];



export default function Home() {
  return (
    <div className="p-10">
      <Heading title={"Dashboard"} />
      <Space16 />
      <div className="flex flex-wrap justify-start items-center gap-8">
        <LargeCardsOrders
          cardName={"Todays Orders"}
          info1={"500"}
          info2={"500"}
          info3={"500"}
        />
        <LargeCardsOrders
          cardName={"Todays Orders"}
          info1={"500"}
          info2={"500"}
          info3={"500"}
        />
        <LargeCardsSales cardName={"Todays Sales"} info={"500"} />
        <LargeCardsSales cardName={"Montly Sales"} info={"500"} />
        <LargeCardsSales cardName={"Yearly Sales"} info={"500"} />
      </div>
      <Space16 />
      <Space16 />
      <div className="flex flex-wrap justify-start items-center gap-6">
        <MediumCards title={"Total Orders"} data={"400"} />
        <MediumCards title={"Orders Pending"} data={"400"} />
        <MediumCards title={"Orders Processing"} data={"400"} />
        <MediumCards title={"Orders Delivered"} data={"400"} />
      </div>
      <Space16 />
      <Space16 />
      <div className="flex  justify-between items-center gap-6 ">
        <div className="bg-primary w-1/2 h-[500px] flex flex-col justify-between items-center p-10 rounded-2xl">
          <div className = 'text-white text-2xl font-bold'>Sales Chart</div>
          <SalesLineChart className="w-1/2" />
        </div>
        <div className="bg-slate-900 h-[500px] flex flex-col justify-between rounded-2xl items-center p-10  w-1/2">
          <div  className = 'text-white text-2xl font-bold ' >Sales Pie Chart</div>
          <SalesPieCart className="w-1/2 " />
        </div>
      </div>
      <Space16 />
      <Space16 />
      <DashboardTable columns={columns} data={jsonData} entriesPerPageDefault={10}/>
    </div>
  );
}
