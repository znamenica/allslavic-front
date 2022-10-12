ssh www-data@176.113.80.84 -p 228 -i .ssh/id_znamenica

scp -i ~/.ssh/id_znamenica -r -P 228 build/* www-data@176.113.80.84:~/slavic-circle/

scp -i ~/.ssh/id_znamenica -r -P 228 build/* www-data@176.113.80.84:~/allslavic-front/