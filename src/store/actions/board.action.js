
// import { toyService } from "../services/toy.service.js";

// export function loadBoard() {
//     return async (dispatch, getState) => {
//         try {
//             const {filterBy} = getState().toyModule
//             const toys = await toyService.query(filterBy)
//             const action = { type: 'SET_TOYS', toys };
//             dispatch(action) 
//         } catch (err) {
//             console.log('cant brings toys',err);
//         }
//     };
// }
