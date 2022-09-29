import { openDatabase } from 'react-native-sqlite-storage'

export const db = openDatabase({
    name: 'golfcourse.db',
    location: 'default',
    createFromLocation: '~www/golfcourse.db'
}, (DB)=>{
    console.log('접속 성공');
}, (error)=>{
    console.log('에러 ', error.message);
})