import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { Fragment, memo, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';
import { ClassLessons } from '../../interfaces/ClassLessons';
import { IClass } from '../../interfaces/IClass';
import { ILesson } from '../../interfaces/ILesson';
import { IStudentLesson } from '../../interfaces/IStudentLesson';
import { UpdateLessonStudent } from '../../interfaces/UpdateLessonStudent';
import { fetchClassData } from '../../store/classesActions';
import { fetchUserClassData } from '../../store/menuActions';
import DataStudentsTable from './DataStudentsTable';

function GridTeacher() {
  const data: IClass[] = useAppSelector((state) => state.menu.userClass);
  const option = useAppSelector((state) => state.menu.option);

  const [lessonId, setLessonId] = useState<string>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserClassData());
  }, [dispatch]);

  const selectedClass = data.filter(
    (item: ClassLessons) => item.name === option,
  );

  const summaries: ILesson[] = selectedClass[0].lessons
    ? selectedClass[0].lessons
    : [];

  const handleChange = (event: SelectChangeEvent) => {
    setLessonId(event.target.value);
  };
  const selectedLesson: ILesson[] = lessonId
    ? summaries.filter((item: ILesson) => item.id === lessonId)
    : [];

  return (
    <Fragment>
      <FormControl>
        <InputLabel>Summary</InputLabel>
        <Select
          fullWidth
          value={lessonId}
          label={'name'}
          onChange={handleChange}
        >
          {summaries.length > 0 &&
            summaries.map((lesson) => (
              <MenuItem key={lesson.id} value={lesson.id}>
                {lesson.date + '-' + lesson.summary}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Box sx={{ heigth: '10%' }}></Box>
      {lessonId && (
        <DataStudentsTable title={'Summary'} data={selectedLesson[0]} />
      )}
    </Fragment>
  );
}

export default memo(GridTeacher);
