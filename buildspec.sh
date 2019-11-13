
npm install -g aws-sdk newman --only=prod --loglevel=warn
npm link aws-sdk --loglevel=error

echo "[functions] building functions..."
for dir in */; do
  if [ -f $dir/package.json ]; then
    echo "[functions] $dir"
    rm -rf ./$dir/node_modules
    npm install --prefix $dir --unsafe-perm
  fi
done
