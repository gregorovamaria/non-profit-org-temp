import { useEffect, useState } from "react";
// firestore
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (col) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let ref = collection(db, col);

		const unsub = onSnapshot(ref, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				const date = doc.data().date.toDate().toLocaleDateString("en-GB");
				results.push({
					id: doc.id,
					date: date,
					src: doc.data().src,
					alt: doc.data().alt,
					title: doc.data().title,
					info: doc.data().info,
					author: doc.data().author,
				});
			});
			setDocuments(results);
		});
		return () => unsub();
	}, [col]);

	return { documents };
};
