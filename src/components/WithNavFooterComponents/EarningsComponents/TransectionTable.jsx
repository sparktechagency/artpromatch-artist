'use client'
import { Table } from 'antd';
import React from 'react';
import { FaCalendar } from 'react-icons/fa6';
import { IoFilter } from 'react-icons/io5';

const TransectionTable = () => {
    const data = [
        {

            key: "1",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",

            artist: "Demo Artist Name",
            date: "Dec 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "2",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Nov 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "3",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Oct 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "4",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Sep 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "5",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Aug 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "6",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Jul 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "7",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Jul 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "8",
            type: "Income",
            source: "Realism Tattoo",
            notes: "Deposit From Jhon Doe",
            artist: "Demo Artist Name",
            date: "Jul 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {

            key: "9",
            type: "Income",
            artist: "Demo Artist Name",
            date: "Jun 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
    ];
    const columns = [

        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            defaultSortOrder: "descend",
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => (
                <p>{type}</p>
            )

        },
        {
            title: "Source/Category",
            dataIndex: "source",
            key: "source",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
        },

    ];
    return (
        <div className=''>
            <div className='flex justify-between items-center md:my-5'>
                <h1 className='text-xl font-bold'>Transactions</h1>
                <div className='flex justify-center items-center gap-5'>
                    <button className='flex justify-center items-center gap-2 border border-primary  py-2 px-4 rounded-lg'><IoFilter className='h-4 w-4 text-primary' />Filter</button>
                    <button className='flex justify-center items-center gap-2 border border-primary  py-2 px-4 rounded-lg'><FaCalendar className='h-4 w-4 text-primary' />Last 30 days</button>


                </div>
            </div>
            <Table columns={columns} dataSource={data} bordered />
        </div>
    );
};

export default TransectionTable;