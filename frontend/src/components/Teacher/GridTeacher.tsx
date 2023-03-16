import { memo, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';
import { ClassLessons } from '../../interfaces/ClassLessons';
import { IClass } from '../../interfaces/IClass';
import { ILesson } from '../../interfaces/ILesson';
import { fetchClassData } from '../../store/classesActions';
import { fetchUserClassData } from '../../store/menuActions';
import DataTable from './DataTable';

function GridTeacher() {
  /*
  const data: IClass[] = useAppSelector((state) => state.classes.classes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserClassData());
    dispatch(fetchClassData());
  }, [dispatch]);

  console.log(data);

  const [summaries, setSummaries] = useState<ILesson[]>();

  const selectedClass = data.filter(
    (item: ClassLessons) => item.name === 'Php',
  );
  console.log(data);

  setSummaries(selectedClass[0].lessons!);

  return (
    <>
      <DataTable title="Students" data={summaries} />
    </>
  );
}
*/
  return <p>Grid view</p>;
}

export default memo(GridTeacher);
