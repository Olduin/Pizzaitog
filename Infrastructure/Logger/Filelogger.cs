using Microsoft.Extensions.Logging;

namespace PizzaSales.Domain.Logger
{
    public class FileLogger : ILogger
    {
        private string _filePath;
        private static object _lock = new object();
        public FileLogger(string path)
        {
            _filePath = path;
        }              

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            if (formatter != null)
            {
                lock (_lock)
                {
                    string datedFilePath = GetDatedFilePath();
                    string logRecord = $"{DateTime.Now:HH:mm:ss} [{logLevel}] {formatter(state, exception)}{Environment.NewLine}";
                    Directory.CreateDirectory(Path.GetDirectoryName(datedFilePath)!);
                    File.AppendAllText(datedFilePath, logRecord);
                }
            }
        }

        private string GetDatedFilePath()
        {
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            string directory = Path.GetDirectoryName(_filePath)!;
            string filename = Path.GetFileNameWithoutExtension(_filePath);

            return Path.Combine(directory, $"{filename}-{date}.log");
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            //return logLevel == LogLevel.Trace;
            return true;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }
    }
}
