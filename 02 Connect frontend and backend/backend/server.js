import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Server is ready!");
});

// get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
	const jokes = [
		{
			id: 1,
			title: "A joke",
			content: "this is first joke",
		},
		{
			id: 2,
			title: "A second joke",
			content: "this is second joke",
		},
		{
			id: 3,
			title: "A third joke",
			content: "this is third joke",
		},
		{
			id: 4,
			title: "A fourth joke",
			content: "this  is fourth joke",
		},
		{
			id: 5,
			title: "A fifth joke",
			content: "this is fifth joke",
		},
	];
	res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Serve at :${port}`);
});
