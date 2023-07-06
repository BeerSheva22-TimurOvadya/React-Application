import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, TextField, Button } from '@mui/material';
import Employee from '../../model/Employee';
import React, { useEffect, useState } from 'react';
import { employeesService } from '../../config/service-config';
import config from '../../config/employees-config.json';

type StatisticsType = 'age' | 'salary';

interface StatisticsProps {
    interval: number;
    statisticsType: StatisticsType;
}

const Statistics: React.FC<StatisticsProps> = ({ interval, statisticsType }) => {
    const [statisticsData, setStatisticsData] = useState<
        Array<{ id: number; min: number; max: number; count: number }>
    >([]);
    const [intervalValue, setIntervalValue] = useState(interval.toString());
    const [appliedInterval, setAppliedInterval] = useState(interval.toString());

    useEffect(() => {
        employeesService.getEmployees().subscribe((data) => {
            if (typeof data !== 'string') {
                setStatisticsData(calculateStatistics(data, Number(appliedInterval), statisticsType));
            } else {
                console.error(data);
            }
        });
    }, [appliedInterval, statisticsType]);

    const calculateStatistics = (
        employees: Employee[],
        interval: number,
        statisticsType: StatisticsType,
    ) => {
        let array = [...employees];
        const currentYear = new Date().getFullYear();

        if (statisticsType === 'age') {
            array = array.map((e) => ({ ...e, age: currentYear - new Date(e.birthDate).getFullYear() }));
            statisticsType = 'age';
        }

        const statisticsObj = count(array, statisticsType, interval);

        function count(array: any[], field: string, interval: number): Record<number, number> {
            return array.reduce((res: Record<number, number>, cur) => {
                const intervalNumber = Math.trunc(cur[field] / interval);
                res[intervalNumber] = res[intervalNumber] === undefined ? 1 : res[intervalNumber] + 1;
                return res;
            }, {});
        }

        return Object.entries(statisticsObj).map(([key, value], id) => {
            const min = Number(key) * interval;
            const max = min + interval - 1;
            return { id, min, max, count: value as number };
        });
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
            headerClassName: 'data-grid-header',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'min',
            headerName: statisticsType === 'age' ? 'Minimum Age' : 'Minimum Salary',
            flex: 0.7,
            headerClassName: 'data-grid-header',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'max',
            headerName: statisticsType === 'age' ? 'Maximum Age' : 'Maximum Salary',
            flex: 0.7,
            headerClassName: 'data-grid-header',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'count',
            headerName: 'Count',
            flex: 0.7,
            headerClassName: 'data-grid-header',
            align: 'center',
            headerAlign: 'center',
        },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                sx={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '30%',
                }}
            >
                <TextField
                    label="Interval"
                    variant="outlined"
                    type="number"
                    inputProps={
                        statisticsType === 'age'
                          ? { min: 0, max: new Date().getFullYear() - config.minYear }
                          : { min: config.minSalary, max: config.maxSalary }
                      }
                    value={intervalValue}
                    onChange={(e) => setIntervalValue(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setAppliedInterval(intervalValue)}
                >
                    Apply
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setAppliedInterval(interval.toString())}
                >
                    Reset
                </Button>
            </Box>
            <Box sx={{ height: '80vh', width: '60vw' }}>
                <DataGrid columns={columns} rows={statisticsData} />
            </Box>
        </Box>
    );
};

export default Statistics;
