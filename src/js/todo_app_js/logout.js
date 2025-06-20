export async function logout() {
    
    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/user_regis_routes/logout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        // Go to Login Page
        if (result.message === 'Logout success!')
            window.location.replace('/myTodoList_PHP_MySql/Public/regis.html?condition=logout');

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Logout failed!');
    }

}