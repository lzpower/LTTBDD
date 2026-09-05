const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// A: Basics with Promise
    // 1.  Create a Promise  that returns  the string  "Hello Async" after 2 seconds
    const ex1 = new Promise<string>((resolve) => {
        setTimeout(() => resolve("1. Hello Async"), 2000);
    });
    ex1.then((result) => console.log(result));

    //   2.  Write a function  that returns  a Promise  resolving  with  the number  10 after  1 second.
    const ex2 = (): Promise<number> =>
        new Promise((resolve) => setTimeout(() => resolve(10), 1000));
    ex2().then((result) => console.log(`2. ${result}`));

    //   3.  Write a function  that rejects a Promise  with  the error  "Something went wrong" after  1 second.
    const ex3 = (): Promise<never> =>
        new Promise((_, reject) => setTimeout(() => reject("3. Something went wrong"), 1000));
    ex3().catch((err) => console.log(err));

    //   4.  Use  .then() and  .catch() to handle  a Promise  that returns  a random  number.
    const ex4 = new Promise<number>((resolve, reject) => {
        const num = Math.random();
        num > 0.5 ? resolve(num) : reject("Number too small");
    });
    ex4
        .then((n) => console.log(`4. Success: ${n}`))
        .catch((err) => console.log(`4. Error: ${err}`));

    //   5.  Create a function  simulateTask(time) that returns  a Promise  resolving  with  "Task done" after  time ms.
    const simulateTask = (time: number, name: string = "Task") =>
        new Promise<string>((resolve) => setTimeout(() => resolve(`${name} done`), time));
    simulateTask(500, "Simulated Task").then((result) => console.log(`5. ${result}`));

     //   6.  Use  Promise.all() to run  3 simulated  Promises  in paralle l  and print  the result.
    Promise.all([
        simulateTask(300, "Task 1"),
        simulateTask(100, "Task 2"),
        simulateTask(200, "Task 3"),
    ]).then((allResults) => console.log("6. Promise.all results:", allResults));

    //   7.  Use  Promise.race() to return  whichever  Promise  resolves  first.
    Promise.race([
        simulateTask(500, "Slow"),
        simulateTask(100, "Fast"),
    ]).then((raceResult) => console.log("7. Promise.race result:", raceResult));

    //   8.  Create a Promise  chain:  square the number  2, then double  it, then add 5.
    Promise.resolve(2)
        .then((n) => n ** 2)
        .then((n) => n * 2)
        .then((n) => n + 5)
        .then((result) => console.log(`8. Chain result: ${result}`));

     //   9.  Write a Promise  that reads an array after 1 second and filters  even numbers.
     new Promise<number[]>((resolve) => setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 1000))
     .then((arr) => arr.filter((n) => n % 2 === 0))
     .then((evenArr) => console.log("9. Filtered even numbers:", evenArr));
    
    //   10.  Use  .finally() to log  "Done" when  a Promise  finishes  (success or failure)
    new Promise((resolve) => setTimeout(resolve, 500))
        .finally(() => console.log("10. Promise finished (Done)"));

// B. Async/Await

    //  11. Convert Exercise 1 into async/await.
    const ex11 = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return "11. Hello Async";
    };
    console.log(await ex11());


    //  12. Write an async function that calls simulateTask(2000) and logs the result.
    const callSimulateTask = async () => {
        // Gọi lại hàm simulateTask đã tạo ở câu 5
        const result = await simulateTask(2000, "Task 12");
        console.log(`12. ${result}`);
    };
    await callSimulateTask();


    //  13. Handle errors using try/catch with async/await.
    const ex13 = async () => {
        try {
            await new Promise((_, reject) => setTimeout(() => reject("13. Something went wrong!"), 1000));
        } catch (error) {
            console.log(`13. Caught error: ${error}`);
        }
    };
    await ex13();


    //  14. Write an async function that takes a number, waits 1 second, and returns the number × 3.
    const multiplyByThree = async (num: number): Promise<number> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return num * 3;
    };
    console.log(`14. 5 x 3 = ${await multiplyByThree(5)}`);


    //  15. Call multiple async functions sequentially using await.
    const runSequentially = async () => {
        const res1 = await multiplyByThree(2); // Đợi 1s
        const res2 = await multiplyByThree(3); // Đợi thêm 1s
        console.log(`15. Sequential results: ${res1}, ${res2}`);
    };
    await runSequentially();


    //  16. Call multiple async functions in parallel using Promise.all().
    const runParallel = async () => {
        // Chạy cùng lúc, tổng thời gian chỉ tốn 1s
        const results = await Promise.all([multiplyByThree(2), multiplyByThree(3)]);
        console.log(`16. Parallel results:`, results);
    };
    await runParallel();


    //  17. Use for await...of to iterate over an array of Promises.
    const runForAwaitOf = async () => {
        const promises = [multiplyByThree(1), multiplyByThree(2), multiplyByThree(3)];
        console.log("17. Iterating with for await...of:");
        for await (const result of promises) {
            console.log(result);
        }
    };
    await runForAwaitOf();


    //  18. Write an async function fetchUser(id) that simulates an API call (resolves a user object after 1 second).
    const fetchUser = async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id, name: `User_${id}` };
    };
    console.log("18. Fetched user:", await fetchUser(101));


    //  19. Create an async function fetchUsers(ids: number[]) that calls fetchUser for each ID.
    const fetchUsers = async (ids: number[]) => {
        return await Promise.all(ids.map(id => fetchUser(id)));
    };
    console.log("19. Fetched users:", await fetchUsers([1, 2, 3]));


    //  20. Add a timeout: if the API call takes more than 2 seconds, throw an error.
    const fetchWithTimeout = async () => {
        // Giả lập API chạy mất 3 giây (quá thời gian quy định)
        const apiCall = new Promise(resolve => setTimeout(() => resolve("20. Data fetched"), 3000));
        
        // Giả lập đồng hồ đếm ngược 2 giây
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("20. Timeout! API took longer than 2 seconds")), 2000)
        );
        
        try {
            // Cái nào xong trước sẽ được chạy (ở đây timeout sẽ chạy trước và ném ra lỗi)
            const result = await Promise.race([apiCall, timeout]);
            console.log(result);
        } catch (error: any) {
            console.log(error.message);
        }
    };
    await fetchWithTimeout();


// C. Fetch API & Simulated I/O

    // 21. Use fetch to get data from a public API.
    const ex21 = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await res.json();
        console.log("21. Fetch API:", data.title);
    };
    await ex21();


    // 22. Call the API multiple times and log the results.
    const ex22 = async () => {
        const urls = [
            "https://jsonplaceholder.typicode.com/todos/1",
            "https://jsonplaceholder.typicode.com/todos/2",
        ];
        // Chạy song song nhiều request fetch
        const results = await Promise.all(urls.map(url => fetch(url).then(r => r.json())));
        console.log("22. Multiple fetches IDs:", results.map(t => t.id));
    };
    await ex22();


    // 23. Write an async function that fetches a list of todos and filters out those that are not completed.
    const fetchAndFilterTodos = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data: any[] = await res.json();
        
        // Lọc ra các todo đã hoàn thành (completed: true) và lấy 3 cái đầu tiên để log cho gọn
        const completedTodos = data.filter(t => t.completed === true).slice(0, 3);
        console.log("23. Completed todos (first 3):", completedTodos.map(t => t.title));
    };
    await fetchAndFilterTodos();


    // 24. Write an async function postData() that sends a POST request to a test API.
    const postData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
        });
        const data = await res.json();
        console.log("24. POST Data response:", data);
    };
    await postData();


    // 25. Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.
    const downloadFile = async () => {
        console.log("25. Downloading file...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("25. Download done!");
    };
    await downloadFile();


    // 26. Use async/await with setTimeout to simulate a 5-second wait.
    const ex26 = async () => {
        console.log("26. Waiting 5 seconds...");
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("26. 5 seconds passed.");
    };
    await ex26();


    // 27. Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.
    const fetchWithRetry = async (url: string, retries: number): Promise<any> => {
        for (let i = 0; i < retries; i++) {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("HTTP Status not OK");
                return await res.json();
            } catch (error) {
                console.log(`27. Attempt ${i + 1} failed. Retrying...`);
                if (i === retries - 1) throw new Error("27. All retries failed!");
            }
        }
    };
    // Test hàm fetchWithRetry
    try {
        const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
        console.log("27. Fetched successfully:", data.title);
    } catch (error: any) {
        console.log(error.message);
    }


    // 28. Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).
    const batchProcess = async () => {
        // Tạo mảng gồm 5 Promises, mỗi Promise chờ 500ms
        const tasks = Array.from({ length: 5 }, (_, i) => 
            new Promise(resolve => setTimeout(() => resolve(`Task ${i + 1}`), 500))
        );
        
        const results = await Promise.all(tasks);
        console.log("28. Batch process complete:", results);
    };
    await batchProcess();


    // 29. Write an async function queueProcess() that processes tasks sequentially in a queue.
    const queueProcess = async () => {
        const tasks = [1, 2, 3];
        console.log("29. Starting queue...");
        for (const t of tasks) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(`29. Processed item ${t}`);
        }
    };
    await queueProcess();


    // 30. Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.
    const ex30 = async () => {
        const p1 = Promise.resolve("Success API 1");
        const p2 = Promise.reject("Failed API 2");
        const p3 = Promise.resolve("Success API 3");

        const results = await Promise.allSettled([p1, p2, p3]);
        console.log("30. allSettled status:");
        
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`API ${index + 1}: Success (${result.value})`);
            } else {
                console.log(`API ${index + 1}: Failed (${result.reason})`);
            }
        });
    };
    await ex30();

